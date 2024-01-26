export function getHeadingOverlayClassName(headingType: ContentType) {
    if (headingType == ContentType.Heading1) {
      return "heading1";
    } else if (headingType == ContentType.Heading2) {
      return "heading2";
    } else if (headingType == ContentType.Heading3) {
      return "heading3";
    }
  }