const fs = require("fs").promises;
const path = require("path");
const readXlsxFile = require("read-excel-file/node");

const prepare = async (name) => {
  const capabilities = [];

  const filePath = path.join(__dirname, `./excel/${name}.xlsx`);

  console.log(`Reading "${name}" industry capabilities...`);

  const capabilityRowMap = {
    "Hierarchy ID": "code",
    Name: "name",
  };

  const capabilityRows = await readXlsxFile(filePath, {
    sheet: "Combined",
    map: capabilityRowMap,
  });

  // console.debug(`# of ${name} capabilities`, capabilityRowMap);

  capabilities.push(...capabilityRows.rows);

  console.log(
    `Successfully read ${capabilities.length} "${name}" industry capabilities.`
  );

  // console.debug("capabilities", capabilities);

  const result = {
    version: "0.1",
    name,
    createdOn: new Date(),
    capabilities,
  };

  await fs.writeFile(
    `./dist/${name}-industry-capabilities.json`,
    JSON.stringify(result),
    { encoding: "utf-8" }
  );

  return result;
};

const main = async () => {
  const industries = [
    "aerospace-and-defense",
    "airline",
    "automotive",
    "banking",
    "broadcasting",
  ];

  for (let industry of industries) {
    await prepare(industry);
  }
};

(async () => {
  await main();
})();
