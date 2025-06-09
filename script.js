window.onload = () => {
  const container = document.getElementById("statusContainer");
  container.innerHTML = "<p>Checking server statuses...</p>";

  const localVersions = ["2016", "2017", "2018", "2019", "2020"];
  const localUrl = "http://localhost:2056/";

  const versions = [
    ...localVersions.map(year => ({ year, url: localUrl })),
    { year: "2021", url: "https://oldrecapi.biotest.dev/" }
  ];

  const checkStatus = async ({ year, url }) => {
    try {
      if (year === "2021") {
        return `<p>${year} Server: ✅ Online (status unverified)</p>`;
      }
      const res = await fetch(url, { method: "GET", mode: "cors" });
      return `<p>${year} Server: ✅ Online</p>`;
    } catch (err) {
      return `<p>${year} Server: ❌ Offline</p>`;
    }
  };

  Promise.all(versions.map(checkStatus)).then(results => {
    container.innerHTML = results.join("");
  });
};
