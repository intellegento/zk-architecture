import MarkdownIt from "markdown-it";
import parse from "html-react-parser";
import * as React from "react";

const markdown = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight: (str) => {
    return `<span class="highlight">${str}</span>`;
  },
});

const replaceBrakesByHtmlTags = (string) => {
  if (string && string.length > 0) {
    return string.replace(/\n/g, "<br />");
  } else {
    return string;
  }
};

export const parseMarkdown = (string) => {
  const html = markdown.render(string || "");
  return parse(html);
};

export const parseHtml = (htmlString) => {
  const parsedString = replaceBrakesByHtmlTags(htmlString);
  return parse(parsedString || "");
};

export const divideTextByComma = (text) => {
  return text.split(",");
};

export const divideTextByPipe = (text) => {
  return text.split("|");
};

export const replacePipeBySpace = (text) => {
  return text.replace("|", " ");
};
