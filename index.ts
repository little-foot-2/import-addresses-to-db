import fs from "fs";
import { xmlParseUtils } from "./lib/xml-parse-utils";
import db from "./data/db";
import sax from "sax";

const filteredNodes: sax.Tag[] = [];

const onOpenTag = function (node: sax.Tag | sax.QualifiedTag) {
  if (node.name !== "Object") {
    return;
  }

  if (node.attributes.REGIONCODE !== "03") {
    return;
  }

  if (node.attributes.NEXTID) {
    return;
  }

  filteredNodes.push(node as sax.Tag);
};

const importToDB = async () => {
  let i = 0;
  for (const node of filteredNodes) {
    const attributes: { [key: string]: string } = {};
    for (const key in node.attributes) {
      attributes[key.toLowerCase()] = node.attributes[key] as string;
    }

    const address: { [key: string]: any } = {
      actstatus: attributes.actstatus && Number(attributes.actstatus),
      aoguid: attributes.aoguid,
      aoid: attributes.aoid,
      aolevel: attributes.aolevel && Number(attributes.aolevel),
      areacode: attributes.areacode,
      autocode: attributes.autocode,
      centstatus: attributes.centstatus && Number(attributes.centstatus),
      citycode: attributes.citycode,
      code: attributes.code,
      currstatus: attributes.currstatus && Number(attributes.currstatus),
      enddate:
        attributes.enddate && xmlParseUtils.parseDate(attributes.enddate),
      formalname: attributes.formalname,
      ifnsfl: attributes.ifnsfl,
      ifnsul: attributes.ifnsul,
      nextid: attributes.nextid,
      offname: attributes.offname,
      okato: attributes.okato,
      oktmo: attributes.oktmo,
      operstatus: attributes.operstatus && Number(attributes.operstatus),
      parentguid: attributes.parentguid,
      placecode: attributes.placecode,
      plaincode: attributes.plaincode,
      postalcode: attributes.postalcode,
      previd: attributes.previd,
      regioncode: attributes.regioncode,
      shortname: attributes.shortname,
      startdate:
        attributes.startdate && xmlParseUtils.parseDate(attributes.startdate),
      streetcode: attributes.streetcode,
      terrifnsfl: attributes.terrifnsfl,
      terrifnsul: attributes.terrifnsul,
      updatedate:
        attributes.updatedate && xmlParseUtils.parseDate(attributes.updatedate),
      ctarcode: attributes.ctarcode,
      extrcode: attributes.extrcode,
      sextcode: attributes.sextcode,
      livestatus: attributes.livestatus && Number(attributes.livestatus),
      normdoc: attributes.normdoc,
    };

    await db(process.env.TABLE_NAME!).insert(address);
    console.log('Row inserted to DB:', i + 1, '/', filteredNodes.length);

    i++;
  }

  console.log("Importing to DB finished");
  console.log("Finished");
};

(async () => {
  const strict = true;

  const saxStream = sax.createStream(strict);

  saxStream.on("error", function (e) {
    throw e;
  });

  let openTagNumber = 0;
  saxStream.on("opentag", function (node) {
    console.log("Open tag #: ", openTagNumber++);
    onOpenTag.call(this, node);
  });

  saxStream.on("end", async function () {
    console.log("XML parsing finished");

    const filteredNodesFilepath = process.env.FILTERED_NODES_FILEPATH!;
    if (fs.existsSync(filteredNodesFilepath)) {
      fs.unlinkSync(filteredNodesFilepath);
    }
    fs.writeFileSync(filteredNodesFilepath, JSON.stringify(filteredNodes));

    await importToDB();
  });

  fs.createReadStream(process.env.XML_FILEPATH!).pipe(saxStream);
})();
