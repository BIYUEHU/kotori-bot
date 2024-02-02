import type { obj } from '@kotori-bot/tools';
import Tsu from 'tsukiko';
import type I18n from '@kotori-bot/i18n';
import type { EventDataBase, EventsList } from './core';
import type CommandError from '../utils/commandError';
import type { Api } from '../service';

declare module './core' {
  interface EventsList {
    midwares: EventDataMidwares;
    before_parse: EventDataBeforeParse;
    parse: EventDataParse;
    before_command: EventDataBeforeCommand;
    command: EventDataCommand;
    before_send: EventDataBeforeSend;
    send: EventDataSend;
    private_msg: EventDataPrivateMsg;
    group_msg: EventDataGroupMsg;
    private_recall: EventDataPrivateRecall;
    group_recall: EventDataGroupRecall;
    private_request: EventDataPrivateRequest;
    group_request: EventDataGroupRequest;
    private_add: EventDataPrivateAdd;
    group_increase: EventDataGroupIncrease;
    group_decrease: EventDataGroupDecrease;
    group_admin: EventDataGroupAdmin;
    group_ban: EventDataGroupBan;
  }
}

export const enum CommandAccess {
  MEMBER,
  MANGER,
  ADMIN
}

export type CommandAction = (
  data: { args: CommandArgType[]; options: obj<CommandArgType> },
  session: EventsList['group_msg' | 'private_msg']
) => MessageQuick;

export type CommandArgType = string | number | boolean /* object<json> */;
export const commandArgTypeSignSchema = Tsu.Union([
  Tsu.Union([Tsu.Literal('string'), Tsu.Literal('number')]),
  Tsu.Literal('boolean')
]);
export type CommandArgTypeSign = Tsu.infer<typeof commandArgTypeSignSchema>;

export interface CommandConfig {
  alias?: string[];
  scope?: MessageScope | 'all';
  access?: CommandAccess;
  help?: string;
  action?: CommandAction;
}

interface CommandParseResult {
  /*   parsed: {
    action: CommandAction;
    args: CommandArgType[];
    options: obj<CommandArgType>;
  }; */
  option_error: { expected: CommandArgTypeSign; reality: CommandArgTypeSign; target: string };
  arg_error: { expected: CommandArgTypeSign; reality: CommandArgTypeSign; index: number };
  arg_many: { expected: number; reality: number };
  arg_few: CommandParseResult['arg_many'];
  syntax: { index: number; char: string };
  unknown: { input: string };
}

export interface CommandResult extends CommandParseResult {
  success: { return?: string };
  error: { error: unknown };
}

export type CommandResultExtra = {
  [K in keyof CommandResult]: { type: K } & CommandResult[K];
};

export type MessageRaw = string;
export type MessageScope = 'private' | 'group';
export type MessageQuickReal = MessageRaw | [string, obj<CommandArgType | void>] | CommandError | void;
export type MessageQuick = MessageQuickReal | Promise<MessageQuickReal>;
export type MidwareCallback = (next: () => void, session: EventDataMsg) => MessageQuick;
export type RegexpCallback = (match: RegExpMatchArray, session: EventDataMsg) => MessageQuick;

type EventDataMsg = EventsList['group_msg'] | EventsList['private_msg'];
export type EventDataTargetId = number | string;

interface EventDataMidwares extends EventDataBase<'midwares'> {
  isPass: boolean;
  event: EventDataMsg;
}

interface EventDataBeforeParse extends EventDataBase<'before_parse'> {
  event: EventDataMsg;
  command: string;
}

interface EventDataParse extends EventDataBase<'parse'> {
  event: EventDataMsg;
  command: string;
  result: CommandError | Parameters<CommandAction>[0];
  cancel(): void;
}

interface EventDataBeforeCommand extends EventDataBase<'before_command'> {
  event: EventDataMsg;
  command: string;
  scope: MessageScope;
  access: CommandAccess;
  cancel(): void;
}

interface EventDataCommand extends EventDataBase<'command'> {
  event: EventDataMsg;
  command: string;
  scope: MessageScope;
  access: CommandAccess;
  result: EventDataParse['result'];
}

interface EventDataBeforeSend extends EventDataBase<'before_send'> {
  api: Api;
  message: MessageRaw;
  messageType: MessageScope;
  targetId: EventDataTargetId;
  cancel(): void;
}

interface EventDataSend extends EventDataBase<'send'> {
  api: Api;
  /* 	message: MessageRaw;
  messageType: MessageScope;
  targetId: EventDataTargetId; */
  messageId: EventDataTargetId;
}

interface EventDataMsgSender {
  nickname: string;
  sex: 'male' | 'female' | 'unknown';
  age: number;
}

export interface EventDataApiBase<T extends keyof EventsList, M extends MessageScope = MessageScope>
  extends EventDataBase<T> {
  api: Api;
  el: Api['elements'];
  userId: EventDataTargetId;
  messageType: M;
  i18n: I18n;
  send(message: MessageRaw): void;
  quick(message: MessageQuick): void;
  extra?: unknown;
}

interface EventDataPrivateMsg extends EventDataApiBase<'private_msg', 'private'> {
  messageId: EventDataTargetId;
  message: MessageRaw;
  // messageH?: object /* what is this? */;
  sender: EventDataMsgSender;
  groupId?: EventDataTargetId;
}

interface EventDataGroupMsg extends EventDataApiBase<'group_msg', 'group'> {
  messageId: EventDataTargetId;
  message: MessageRaw;
  sender: EventDataMsgSender;
  groupId: EventDataTargetId;
}

interface EventDataPrivateRecall extends EventDataApiBase<'private_recall', 'private'> {
  messageId: EventDataTargetId;
}

interface EventDataGroupRecall extends EventDataApiBase<'group_recall', 'group'> {
  messageId: EventDataTargetId;
  operatorId: EventDataTargetId;
  groupId: EventDataTargetId;
}

interface EventDataPrivateRequest extends EventDataApiBase<'private_request', 'private'> {
  userId: EventDataTargetId;
}

interface EventDataGroupRequest extends EventDataApiBase<'group_request', 'group'> {
  userId: EventDataTargetId;
  operatorId: EventDataTargetId;
  groupId: EventDataTargetId;
}

interface EventDataPrivateAdd extends EventDataApiBase<'private_add', 'private'> {
  userId: EventDataTargetId;
}

interface EventDataGroupIncrease extends EventDataApiBase<'group_increase', 'group'> {
  userId: EventDataTargetId;
  operatorId: EventDataTargetId;
  groupId: EventDataTargetId;
}

interface EventDataGroupDecrease extends EventDataApiBase<'group_decrease', 'group'> {
  userId: EventDataTargetId;
  operatorId: EventDataTargetId;
  groupId: EventDataTargetId;
}

interface EventDataGroupAdmin extends EventDataApiBase<'group_admin', 'group'> {
  userId: EventDataTargetId;
  operation: 'set' | 'unset';
  groupId: EventDataTargetId;
}

interface EventDataGroupBan extends EventDataApiBase<'group_ban', 'group'> {
  userId: EventDataTargetId | 0;
  operatorId?: EventDataTargetId;
  time?: number | -1;
  groupId: EventDataTargetId;
}
