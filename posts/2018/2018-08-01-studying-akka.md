---
title: Akka Stream
---

### Stream

- "blocks used to build data process pipeline"

  - Source: 0 input / 1 output
  - Sink: 1 input / 0 output
  - Flow: 1 input / 1 output
  - Graph: M input / N output

- `class Flow[-In, +Out, +Mat]`
- Graph
  - "a freely reusable blueprint"
- Materializer

  - something that 'runs' the graph?

- ActorMaterializer
  - An ActorMaterializer takes a stream blueprint and turns it into a running stream.

### Actors:

#### Analysis of actor: State Machine

- in:
  - props
  - messages
    - serialized object (AnyRef)
    - may contain actorRef
- inside: respond to message, single-threaded
- out:
  - messages (to actorRefs got via _in_)

#### Common patterns and how to test them

- SilentActor: respond by changing internal state
  - single-threaded (after single message?): inspect `underLyingActor` with `TestActorRef`
  - multi-threaded (after multi message?): change the actor to expose i
- SendingActor: respond by sending message (s)
  - mock actorRefs ?
  - or: `expectMsg()` series that checks _ALL_ messages sent (internal: messages sent are put into an internal `BlockingDeque[Message]` in TestKit)
- SideEffectingActor: respond by causing side effect

  - mock deps ?

- In:
  - Props

#### Fault tolerating

"fault": mostly uncaught exception

An actor's supervisor (parent) decides what to do:

- restart: re-create from the props (becomes the same actorRef) and continue processing **next** message
  - resets internal state
  - the message caused fault can be seen in `preRestart` hook
- ignore
  - keeps internal state
- stop
  - cause `Terminated` message
- escalate: let supervisor's supervisor decide

##### Lifecycle

- preStart
- preRestart
  - default impl: stop all children and call postRestart
- postRestart
- postStop
