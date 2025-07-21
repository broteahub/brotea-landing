declare module 'mjml' {
  export interface MJMLParseOptions {
    keepComments?: boolean;
    beautify?: boolean;
    minify?: boolean;
    validationLevel?: 'strict' | 'soft' | 'skip';
    filePath?: string;
  }

  export interface MJMLParseError {
    line: number;
    message: string;
    tagName: string;
    formattedMessage: string;
  }

  export interface MJMLParseResults {
    html: string;
    json?: object;
    errors: MJMLParseError[];
  }

  export default function mjml2html(
    mjml: string,
    options?: MJMLParseOptions
  ): MJMLParseResults;
}