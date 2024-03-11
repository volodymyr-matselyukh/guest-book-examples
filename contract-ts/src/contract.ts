import { NearBindgen, near, call, view, Vector, initialize } from 'near-sdk-js'
import { POINT_ONE, PostedMessage } from './model'

@NearBindgen({requireInit: true})
class GuestBook {
  messages: Vector<PostedMessage>;

  @initialize({ privateFunction: true })
  init() {
    this.messages = new Vector<PostedMessage>("guestmessages");
  }

  constructor() {
    this.messages = new Vector<PostedMessage>("guestmessages");
  }

  @call({ payableFunction: true })
  // Public - Adds a new message.
  add_message({ text }: { text: string }) {
    // If the user attaches more than 0.1N the message is premium
    const premium = near.attachedDeposit() >= BigInt(POINT_ONE);
    const sender = near.predecessorAccountId();

    const message: PostedMessage = { premium, sender, text };
    this.messages.push(message);
  }

  @view({})
  // Returns an array of messages.
  get_messages({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): PostedMessage[] {
    return this.messages.toArray().slice(from_index, from_index + limit);
  }

  @view({})
  total_messages(): number { return this.messages.length }
}
