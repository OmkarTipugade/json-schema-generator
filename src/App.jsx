import { useState } from "react";
import { FileCode, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { SchemaBuilder } from "./components/SchemaBuilder";
import { JsonPreview } from "./components/JsonPreview";

function App() {
  const [activeTab, setActiveTab] = useState("builder");
  const [schema, setSchema] = useState({});
  const [sampleData, setSampleData] = useState({});

  const handleSchemaChange = (newSchema, newSampleData) => {
    setSchema(newSchema);
    setSampleData(newSampleData);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileCode className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  JSON Schema Builder
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create JSON schemas with real-time sample data preview
                </p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="builder" className="flex items-center">
                  <Settings size={16} className="mr-2" />
                  Builder
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center">
                  <FileCode size={16} className="mr-2" />
                  Live Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto h-[calc(100vh-112px)]">
        <div className="h-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full"
          >
            <TabsContent value="builder" className="h-full mt-0">
              <SchemaBuilder onSchemaChange={handleSchemaChange} />
            </TabsContent>
            <TabsContent value="preview" className="h-full mt-0">
              <JsonPreview schema={schema} sampleData={sampleData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default App;
