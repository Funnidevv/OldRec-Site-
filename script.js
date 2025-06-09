window.onload = () => {
  const container = document.getElementById("statusContainer");
  container.innerHTML = "<p>Checking server statuses...</p>";

  const versions = [
    { year: "2016", url: "http://localhost:2016/status" },
    { year: "2017", url: "http://localhost:2017/status" },
    { year: "2018", url: "http://localhost:2018/status" },
    { year: "2019", url: "http://localhost:2019/status" },
    { year: "2020", url: "http://localhost:2020/status" },
    { year: "2021", url: "https://oldrecapi.biotest.dev/status" }
  ];

  const checkStatus = async ({ year, url }) => {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) return `<p>${year} Server: ✅ Online</p>`;
      else return `<p>${year} Server: ⚠️ Error</p>`;
    } catch (err) {
      return `<p>${year} Server: ❌ Offline</p>`;
    }
  };

  Promise.all(versions.map(checkStatus)).then(results => {
    container.innerHTML = results.join("");
  });
};
