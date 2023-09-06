
### Tiny Compiler

> The origin repo: [The super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

#### Knowledge required
- use typescript
- use TDD
- use FSM



#### Steps
- Parsing
    - Lexical Analysis
        - takes raw code into tokens by a **tokenizer** or **lexer**
    - Syntactic Analysis
        - takes the tokens and reformats them into a representation that describes
        each part of the syntax and their relation to one another
        - known as an intermediate representation or **abstract syntax tree**
        - **parser** is used to generate the AST

- Transformation
    - manipulate the AST from the last step in the same language or translate it into an entirely new language
    - When transforming the AST we can manipulate nodes by adding, removing, or replacing
    properties, we can add nodes, remove nodes, or leave the AST alone and create an entirely
    new one based on it
    - Traversal
      - This process goes to each node in the AST depth-first
      - **Visitors**
    - Transformer

- Code Generation
  - takes the final AST and turns it into code again
