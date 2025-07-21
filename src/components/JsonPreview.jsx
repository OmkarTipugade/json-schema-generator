import { useState } from "react";
import { Copy, Download } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export const JsonPreview = ({ schema, sampleData }) => {
  const [activeTab, setActiveTab] = useState("sample");
  const [copied, setCopied] = useState(false);

  const currentJson = activeTab === "schema" ? schema : sampleData;
  const formattedJson = JSON.stringify(currentJson, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadJson = () => {
    const filename =
      activeTab === "schema" ? "schema.json" : "sample-data.json";
    const blob = new Blob([formattedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-shrink-0 border-b rounded-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>JSON Preview</CardTitle>
              <CardDescription>
                Real-time preview of your schema and sample data
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy size={16} className="mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button onClick={downloadJson} size="sm">
                <Download size={16} className="mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto h-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="sample" className="text-sm">
                Sample Data
              </TabsTrigger>
              <TabsTrigger value="schema" className="text-sm">
                JSON Schema
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sample" className="flex-1 mt-0">
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <div className="bg-slate-950 rounded-lg p-6 h-full overflow-auto">
                    <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-words text-green-400">
                      {formattedJson}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schema" className="flex-1 mt-0">
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <div className="bg-slate-950 rounded-lg p-6 h-full overflow-auto">
                    <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-words text-blue-400">
                      {formattedJson}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
