import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function servePrerenderedTransport(): Plugin {
  const rewrite = (url?: string) => {
    if (!url) return url;
    const [pathname, search] = url.split("?");
    if (pathname === "/transport") {
      return search ? `/transport/index.html?${search}` : "/transport/index.html";
    }
    return url;
  };

  return {
    name: "serve-prerendered-transport",
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        req.url = rewrite(req.url) ?? req.url;
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  appType: "spa",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    servePrerenderedTransport(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
