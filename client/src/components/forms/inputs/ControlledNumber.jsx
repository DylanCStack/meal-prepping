export default function ControlledNumber(props) {
  return (
    <input type='number' value={props.value} onChange={e => props.onChange(props.property, e)}step={this.props.decimal ? '0.1' : '1'}/>
  )
}