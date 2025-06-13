import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '../constants/theme';
import { fileManager } from '../utils/fileManager';

interface EPUBReaderProps {
  bookId: string;
  onProgressUpdate?: (progress: number) => void;
}

export const EPUBReader: React.FC<EPUBReaderProps> = ({
  bookId,
  onProgressUpdate,
}) => {
  const [bookPath, setBookPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    loadBook();
  }, [bookId]);

  const loadBook = async () => {
    try {
      const path = await fileManager.getBookFile(bookId);
      setBookPath(path);
    } catch (error) {
      console.error('Error loading book:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!bookPath) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading book</Text>
      </View>
    );
  }

  // EPUB.js reader HTML template
  const readerHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
            overflow-x: hidden;
          }
          #viewer {
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }
          @media (prefers-color-scheme: dark) {
            body {
              color: #fff;
              background: #1a1a1a;
            }
          }
        </style>
      </head>
      <body>
        <div id="viewer"></div>
        <script>
          const book = ePub("${bookPath}");
          const rendition = book.renderTo("viewer", {
            width: "100%",
            height: "100%",
            spread: "none"
          });

          rendition.display();

          // Handle progress updates
          book.ready.then(() => {
            const totalLocations = book.locations.total;
            rendition.on("relocated", (location) => {
              const progress = (location.start.location / totalLocations) * 100;
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "progress",
                progress: progress
              }));
            });
          });

          // Handle errors
          book.on("error", (error) => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "error",
              error: error.message
            }));
          });
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'progress' && onProgressUpdate) {
        onProgressUpdate(data.progress);
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: readerHTML }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onLoadEnd={() => setLoading(false)}
        onMessage={handleMessage}
        originWhitelist={['*']}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 