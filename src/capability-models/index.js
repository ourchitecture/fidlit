const fs = require("fs");
const path = require("path");
const readXlsxFile = require("read-excel-file/node");

const main = async () => {
  const capabilities = [];

  const airlineFilePath = path.join(__dirname, "./excel/airline.xlsx");

  console.log("Reading airline industry capabilities...");

  const airlineCapabilityRowMap = {
    "Hierarchy ID": "code",
    Name: "name",
  };

  const airlineCapabilityRows = await readXlsxFile(airlineFilePath, {
    sheet: "Combined",
    map: airlineCapabilityRowMap,
  });

  // console.debug("# of airline capabilities", airlineCapabilityRows);

  capabilities.push(...airlineCapabilityRows.rows);

  // const airlineCategoryRows = await readXlsxFile(airlineFilePath, {
  //   sheet: "Categories",
  //   map: airlineRowMap,
  // });

  // // console.debug("# of airline categories", airlineCategoryRows);

  // for (const airlineCategoryRow of airlineCategoryRows.rows) {
  //   // NOTE: The category capability is already present in the child sheets.
  //   // capabilities.push(airlineCategoryRow);

  //   const categoryCode = airlineCategoryRow.code;

  //   console.log(`Reading airline industry ${categoryCode} capabilities...`);

  //   const airlineCapabilitiesRows = await readXlsxFile(airlineFilePath, {
  //     sheet: categoryCode,
  //     map: airlineRowMap,
  //   });

  //   // console.debug(
  //   //   `# of ${categoryCode} airline capabilities`,
  //   //   airlineCapabilitiesRows
  //   // );

  //   capabilities.push(...airlineCapabilitiesRows.rows);

  //   console.log(
  //     `Successfully read airline industry ${categoryCode} capabilities.`
  //   );
  // }

  console.log("Successfully read airline industry capabilities.");

  // console.debug("capabilities", capabilities);

  const result = {
    version: "0.1",
    createdOn: new Date(),
    capabilities,
  };

  fs.writeFileSync(
    "./dist/airline-industry-capabilities.json",
    JSON.stringify(result),
    { encoding: "utf-8" }
  );
};

(async () => {
  await main();
})();
