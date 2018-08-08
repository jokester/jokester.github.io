

### Flow


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
