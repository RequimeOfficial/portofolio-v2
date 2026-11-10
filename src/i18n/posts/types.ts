export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'code'; lang: string; code: string };

export type PostSlug =
  | 'scalable-react-applications'
  | 'unity-concept-to-launch'
  | 'ai-in-web-development-prompt-engineering'
  | 'nodejs-performance-optimization'
  | 'immersive-vr-experiences'
  | 'integrating-chatgpt-api';

export interface PostText {
  title: string;
  excerpt: string;
  content: ContentBlock[];
}

/** Every language must provide every article (enforced by the Record type). */
export type PostTexts = Record<PostSlug, PostText>;
