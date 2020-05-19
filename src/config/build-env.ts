declare const process: {
  env: {
    SOME_CONSTANT: string;
    NEXT_DEV: boolean;
    GA_TRACKING_ID: string;
  };
};

export const inBrowser = typeof window !== 'undefined';
export const inServer = !inBrowser;

export const isDevBuild = !!process.env.NEXT_DEV;

export const buildEnv = {
  SOME_CONSTANT: process.env.SOME_CONSTANT,
  GA_TRACKING_ID: process.env.GA_TRACKING_ID || null,
} as const;

export type BuildEnv = typeof buildEnv;
