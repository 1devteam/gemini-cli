import { 
  IPlugin, 
  IPluginMetadata, 
  IPluginCommand, 
  IPluginContext, 
  IPluginResult,
  PluginFactory 
} from './plugin_interface.js';

/**
 * Example plugin that demonstrates the plugin interface
 * This plugin provides basic utility commands
 */
class ExamplePlugin implements IPlugin {
  metadata: IPluginMetadata = {
    id: 'example-plugin',
    name: 'Example Plugin',
    version: '1.0.0',
    description: 'An example plugin demonstrating the Gemini CLI plugin interface',
    author: 'Gemini CLI Team',
    minCliVersion: '0.1.0'
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
          {
            name: 'name',
            description: 'Name to greet',
            type: 'string',
            required: false,
            default: 'World'
          },
          {
            name: 'uppercase',
            description: 'Convert greeting to uppercase',
            type: 'boolean',
            required: false,
            default: false
          }
        ],
        handler: this.handleHello.bind(this)
      },
      {
        name: 'file-info',
        description: 'Get information about a file',
        options: [
          {
            name: 'path',
            description: 'Path to the file',
            type: 'string',
            required: true
          }
        ],
        handler: this.handleFileInfo.bind(this)
      },
      {
        name: 'generate-sample',
        description: 'Generate a sample file using Gemini',
        options: [
          {
            name: 'type',
            description: 'Type of sample to generate',
            type: 'string',
            required: true
          },
          {
            name: 'output',
            description: 'Output file path',
            type: 'string',
            required: false
          }
        ],
        handler: this.handleGenerateSample.bind(this)
      }
    ];
  }

  private async handleHello(args: any, context: IPluginContext): Promise<IPluginResult> {
    try {
      const name = args.name || 'World';
      const uppercase = args.uppercase || false;
      
      let greeting = `Hello, ${name}!`;
      if (uppercase) {
        greeting = greeting.toUpperCase();
      }

      context.logger.info(`Generated greeting: ${greeting}`);

      return {
        success: true,
        message: greeting,
        data: { greeting, name, uppercase }
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to generate greeting: ${error}`
      };
    }
  }

  private async handleFileInfo(args: any, context: IPluginContext): Promise<IPluginResult> {
    try {
      const filePath = args.path;
      
      if (!filePath) {
        return {
          success: false,
          error: 'File path is required'
        };
      }

      const exists = await context.fs.exists(filePath);
      if (!exists) {
        return {
          success: false,
          error: `File does not exist: ${filePath}`
        };
      }

      const stats = await context.fs.stat(filePath);
      const content = stats.isFile() ? await context.fs.readFile(filePath) : null;

      const info = {
        path: filePath,
        exists: true,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        size: stats.size,
        modified: stats.mtime,
        contentLength: content ? content.length : null,
        contentPreview: content ? content.substring(0, 100) + (content.length > 100 ? '...' : '') : null
      };

      context.logger.info(`File info retrieved for: ${filePath}`);

      return {
        success: true,
        message: `File information for ${filePath}`,
        data: info
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to get file info: ${error}`
      };
    }
  }

  private async handleGenerateSample(args: any, context: IPluginContext): Promise<IPluginResult> {
    try {
      const type = args.type;
      const outputPath = args.output || `sample_${type}.txt`;

      if (!type) {
        return {
          success: false,
          error: 'Sample type is required'
        };
      }

      // Generate content using Gemini
      const prompt = `Generate a sample ${type} file. Make it educational and well-commented.`;
      const generatedContent = await context.gemini.generateText(prompt);

      // Write to file
      await context.fs.writeFile(outputPath, generatedContent);

      context.logger.info(`Generated sample ${type} file: ${outputPath}`);

      return {
        success: true,
        message: `Generated sample ${type} file`,
        data: { type, outputPath, contentLength: generatedContent.length },
        files: [outputPath]
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to generate sample: ${error}`
      };
    }
  }

  async cleanup(): Promise<void> {
    console.log('Example plugin cleanup completed');
  }

  getConfigSchema(): any {
    return {
      type: 'object',
      properties: {
        defaultName: {
          type: 'string',
          description: 'Default name for greetings',
          default: 'World'
        },
        enableUppercase: {
          type: 'boolean',
          description: 'Enable uppercase greetings by default',
          default: false
        }
      }
    };
  }

  validateConfig(config: any): boolean {
    if (config.defaultName && typeof config.defaultName !== 'string') {
      return false;
    }
    if (config.enableUppercase && typeof config.enableUppercase !== 'boolean') {
      return false;
    }
    return true;
  }
}

// Plugin factory function
const createExamplePlugin: PluginFactory = () => {
  return new ExamplePlugin();
};

export default createExamplePlugin;

