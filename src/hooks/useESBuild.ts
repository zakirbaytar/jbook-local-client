import { useCallback, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

interface ESBuildHookOptions {
  autoStart: boolean;
}

const useESBuild = ({ autoStart }: ESBuildHookOptions) => {
  const service = useRef<esbuild.Service | null>(null);

  const initService = useCallback(() => {
    if (autoStart) startService();
  }, [autoStart]);

  useEffect(() => {
    initService();
    return () => {
      service.current?.stop();
    };
  }, [initService]);

  const startService = async () => {
    if (!service.current) {
      service.current = await esbuild.startService({
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
        worker: true,
      });
    }
  };

  const build = async (input: string) => {
    if (!service.current) {
      return null;
    }

    return service.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
  };

  return { startService, build };
};

export default useESBuild;
