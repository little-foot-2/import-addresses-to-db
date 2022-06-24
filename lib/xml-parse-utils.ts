class XmlParseUtils {
  parseDate(xmlValue: string): Date {
    return new Date(
      Number(xmlValue.substr(0, 4)),
      Number(xmlValue.substr(4 + 1, 2)),
      Number(xmlValue.substr(4 + 1 + 2 + 1, 2))
    );
  }
}

export const xmlParseUtils = new XmlParseUtils();
