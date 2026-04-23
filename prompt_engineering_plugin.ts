import type {
  IPlugin,
  IPluginCommand,
  IPluginContext,
  IPluginMetadata,
  IPluginResult,
  PluginFactory,
} from './plugin_interface.js';
import path from 'path';

interface ForgeProjectArgs {
  prompt?: string;
  dryRun?: boolean;
  outputDir?: string;
}

class PromptEngineeringPlugin implements IPlugin {
  metadata: IPluginMetadata = {
    id: 'prompt-engineering',
    name: 'Prompt Engineering Module',
    version: '1.1.0',
    description: 'Structured prompt-to-spec generation and safe project scaffolding support',
    author: 'Gemini CLI Team',
    minCliVersion: '0.2.0',
    category: 'generation',
    capabilities: ['prompt-to-spec', 'project-scaffolding', 'documentation'],
    permissions: ['project:read', 'project:write'],
  };

  async initialize(context: IPluginContext): Promise<void> {
    context.logger.info('Prompt Engineering Plugin initialized');
  }

  getCommands(): IPluginCommand[] {
    return [
      {
        name: 'forge-project',
        description: 'Convert a project prompt into a structured specification scaffold',
        aliases: ['forge', 'create-spec'],
        options: [
          {
            name: 'prompt',
            description: 'Project description or natural language build request',
            type: 'string',
            required: true,
          },
          {
            name: 'dryRun',
            description: 'Return the generated plan without writing files',
            type: 'boolean',
            default: false,
          },
          {
            name: 'outputDir',
            description: 'Directory where generated specification files should be written',
            type: 'string',
            required: false,
          },
        ],
        handler: this.handleForgeProject.bind(this),
      },
    ];
  }

  private async handleForgeProject(args: ForgeProjectArgs, context: IPluginContext): Promise<IPluginResult> {
    const prompt = args.prompt?.trim();
    const dryRun = args.dryRun ?? false;

    if (!prompt) {
      return {
        success: false,
        error: 'prompt is required',
      };
    }

    const spec = this.buildSpecification(prompt);

    if (dryRun) {
      return {
        success: true,
        message: 'Generated project specification dry run',
        data: { spec },
      };
    }

    const outputDir = path.resolve(context.cwd, args.outputDir ?? `forge-${Date.now().toString(36)}`);
    const specPath = path.join(outputDir, 'PROJECT_SPEC.md');

    await context.fs.mkdir(outputDir);
    await context.fs.writeFile(specPath, spec);

    return {
      success: true,
      message: `Generated project specification at ${specPath}`,
      data: {
        outputDir,
        specPath,
      },
      files: [specPath],
    };
  }

  private buildSpecification(prompt: string): string {
    return [
      '# Project Specification',
      '',
      '## Source Prompt',
      '',
      prompt,
      '',
      '## Goals',
      '',
      '- Convert the request into an executable engineering plan.',
      '- Preserve assumptions and unknowns instead of hiding them.',
      '- Define acceptance criteria before implementation begins.',
      '',
      '## Required Sections',
      '',
      '- Problem statement',
      '- Functional requirements',
      '- Non-functional requirements',
      '- Dependency and environment requirements',
      '- Hardware assumptions',
      '- Runtime simulation plan',
      '- Test strategy',
      '- Delivery phases',
      '- Rollback plan',
      '',
      '## Acceptance Criteria',
      '',
      '- The implementation is reproducible from this specification.',
      '- Tests cover core invariants and failure paths.',
      '- Build, typecheck, and test commands pass before release.',
      '',
    ].join('\n');
  }

  async cleanup(): Promise<void> {
    return;
  }
}

const createPromptEngineeringPlugin: PluginFactory = () => new PromptEngineeringPlugin();

export default createPromptEngineeringPlugin;
