import { ProjectChat } from './project-chat.domain';
import type { ProjectChatNewData } from './project-chat.type';

export class ProjectChatFactory {
  static create(data: ProjectChatNewData): ProjectChat {
    return ProjectChat.new(data);
  }
}
