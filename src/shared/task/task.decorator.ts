import 'reflect-metadata';

const TASK_METADATA = Symbol('TASK_METADATA');

type Parser = (obj: any) => object;
export type TaskMetadata = {
  methodName: string;
  parser?: Parser;
};

export function QueueTask(taskName: string, parser?: Parser): MethodDecorator {
  return (target, propertyKey) => {
    const handlers =
      Reflect.getMetadata(TASK_METADATA, target.constructor) || {};
    handlers[taskName] = {
      methodName: propertyKey as string,
      parser,
    } satisfies TaskMetadata;

    Reflect.defineMetadata(TASK_METADATA, handlers, target.constructor);
  };
}

export function getTaskHandlers(target: any) {
  return Reflect.getMetadata(TASK_METADATA, target.constructor) || {};
}
