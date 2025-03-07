export async function onRequest(context) {
  const url = new URL(context.request.url);
  const ip = url.pathname.split('/')[1];

  if (!ip) {
    return new Response('IP address is required', { status: 400 });
  }

  const apiUrl = `http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'fail') {
      return new Response(
        JSON.stringify({ status: 'fail', message: data.message, query: ip }, null, 2),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error fetching IP data', { status: 500 });
  }
}
