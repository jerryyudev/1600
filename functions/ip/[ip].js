export async function onRequest(context) {
  // 获取动态路由参数
  const { ip } = context.params;
  
  if (!ip) {
    return new Response(JSON.stringify({
      status: "fail",
      message: "invalid query",
      query: "missing"
    }), { headers: { "Content-Type": "application/json" }, status: 400 });
  }

  // 构造查询的 URL，访问 ip-api.com 免费的 JSON API
  const apiUrl = `http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`;

  try {
    // 调用 ip-api.com 的 API
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
