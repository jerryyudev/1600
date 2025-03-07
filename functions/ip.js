export async function onRequest(context) {
    const url = new URL(context.request.url);
    const pathParts = url.pathname.split("/").filter(Boolean); // 过滤空值

    if (pathParts.length < 2 || !pathParts[1]) {
        return new Response(JSON.stringify({
            status: "fail",
            message: "invalid query",
            query: "missing"
        }), { headers: { "Content-Type": "application/json" }, status: 400 });
    }

    const ip = pathParts[1];

    const apiUrl = `http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        return new Response(JSON.stringify(data, null, 2), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            status: "fail",
            message: "API error"
        }), { headers: { "Content-Type": "application/json" }, status: 500 });
    }
}
