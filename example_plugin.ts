import type {
  IPlugin,
  IPluginCommand,
  IPluginContext,
  IPluginMetadata,
  IPluginResult,
  PluginFactory,
} from './plugin_interface.js';

interface HelloArgs {
  name?: string;
  uppercase?: boolean;
}

interface FileInfoArgs {
  path?: string;
}

interface GenerateSampleArgs {
  type?: string;
  output?: string;
}

interface FileStatsLike {
  isFile(): boolean;
  isDirectory(): boolean;
  size: number;
  mtime: Date;
}

class ExamplePlugin implements IPlugin {
  metadata: IPluginMetadata = {
    id: 'example-plugin',
    name: 'Example Plugin',
    version: '1.0.1',
    description: 'Example plugin demonstrating safe command, filesystem, and Gemini API usage',
    author: 'Gemini CLI Team',
    minCliVersion: '0.2.0',
    category: 'utility',
    capabilities: ['commands', 'filesystem-inspection', 'sample-generation'],
    permissions: ['project:read', 'project:write'],
  };

  async initialize(context: IPluginContext): Promise<void> {
    context.logger.info('Example plugin initialized');
  }

  getCommands(): IPluginCommand[] {
    return [
      {
        name: 'hello',
        description: 'Say hello with an optional name',
        aliases: ['hi'],
        options: [
          { name: 'name', description: 'Name to greet', type: 'string', required: false, default: 'World' },
          { name: 'uppercase', description: 'Convert greeting to uppercase', type: 'boolean', required: false, default: false },
        ],
        handler: this.handleHello.bind(this),
      },
      {
        name: 'file-info',
        description: 'Get information about a file',
        options: [{ name: 'path', description: 'Path to the file', type: 'string', required: true }],
        handler: this.handleFileInfo.bind(this),
      },
      {
        name: 'generate-sample',
        description: 'Generate a sample file using Gemini',
        options: [
          { name: 'type', description: 'Type of sample to generate', type: 'string', required: true },
          { name: 'output', description: 'Output file path', type: 'string', required: false },
        ],
        handler: this.handleGenerateSample.bind(this),
      },
    ];
  }

  private async handleHello(args: HelloArgs, context: IPluginContext): Promise<IPluginResult> {
    const name = args.name?.trim() || 'World';
    const uppercase = args.uppercase ?? false;
    const greeting = uppercase ? `Hello, ${name}!`.toUpperCase() : `Hello, ${name}!`;

    context.logger.info(`Generated greeting: ${greeting}`);

    return {
      success: true,
      message: greeting,
      data: { greeting, name, uppercase },
    };
  }

  private async handleFileInfo(args: FileInfoArgs, context: IPluginContext): Promise<IPluginResult> {
    const filePath = args.path?.trim();

    if (!filePath) {
      return { success: false, error: 'File path is required' };
    }

    const exists = await context.fs.exists(filePath);
    if (!exists) {
      return { success: false, error: `File does not exist: ${filePath}` };
    }

    const stats = (await context.fs.stat(filePath)) as FileStatsLike;
    const isFile = stats.isFile();
    const content = isFile ? await context.fs.readFile(filePath) : null;

    return {
      success: true,
      message: `File information for ${filePath}`,
      data: {
        path: filePath,
        exists: true,
        isFile,
        isDirectory: stats.isDirectory(),
        size: stats.size,
        modified: stats.mtime,
        contentLength: content?.length ?? null,
        contentPreview: content ? `${content.substring(0, 100)}${content.length > 100 ? '...' : ''}` : null,
      },
    };
  }

  private async handleGenerateSample(args: GenerateSampleArgs, context: IPluginContext): Promise<IPluginResult> {
    const type = args.type?.trim();

    if (!type) {
      return { success: false, error: 'Sample type is required' };
    }

    const outputPath = args.output?.trim() || `sample_${type}.txt`;
    const prompt = `Generate a concise, educational, well-commented ${type} sample file.`;
    const generatedContent = await context.gemini.generateText(prompt);

    await context.fs.writeFile(outputPath, generatedContent);

    return {
      success: true,
      message: `Generated sample ${type} file`,
      data: { type, outputPath, contentLength: generatedContent.length },
      files: [outputPath],
    };
  }

  async cleanup(): Promise<void> {
    return;
  }

  getConfigSchema(): Record<string, unknown> {
    return {
      type: 'object',
      properties: {
        defaultName: { type: 'string', description: 'Default name for greetings', default: 'World' },
        enableUppercase: { type: 'boolean', description: 'Enable uppercase greetings by default', default: false },
      },
    };
  }

  validateConfig(config: Record<string, unknown>): boolean {
    if (config.defaultName !== undefined && typeof config.defaultName !== 'string') {
      return false;
    }
    if (config.enableUppercase !== undefined && typeof config.enableUppercase !== 'boolean') {
      return false;
    }
    return true;
  }
}

const createExamplePlugin: PluginFactory = () => new ExamplePlugin();

export default createExamplePlugin;
