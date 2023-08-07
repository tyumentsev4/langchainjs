import { TranscriptResponse, YoutubeTranscript } from "youtube-transcript";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";

interface YoutubeConfig {
  urlOrId: string;
  language?: string;
}

export class YoutubeLoader extends BaseDocumentLoader {
  private urlOrId: string;

  private language?: string;

  constructor({ urlOrId, language }: YoutubeConfig) {
    super();
    this.urlOrId = urlOrId;
    this.language = language;
  }

  async load(): Promise<Document[]> {
    let transcript: TranscriptResponse[] | undefined;
    try {
      transcript = await YoutubeTranscript.fetchTranscript(this.urlOrId, {
        lang: this.language,
      });
    } catch (e: unknown) {
      throw new Error(
        `Failed to get youtube video transcription: ${(e as Error).message}`
      );
    }
    const document = new Document({
      pageContent: transcript.map((item) => item.text).join(" "),
      metadata: {
        urlOrId: this.urlOrId,
      },
    });

    return [document];
  }
}
