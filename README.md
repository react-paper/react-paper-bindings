# Paperjs bindings for React

Just an idea ... 

```
render() {
  return (
    <div>
      <h1>Hello world</h1>
      <Paper>
        <Layer>
          <Circle
            center={[this.state.x, this.state.y]}
            radius={50}
            fillColor={this.color[this.state.color % 7] }/>
        </Layer>
      </Paper>
    </div>
  );
}
```
