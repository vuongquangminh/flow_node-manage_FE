import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

const handleStyle = { left: 10 };

function TextUpdaterNode() {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      {/* Hãy nhìn bên initialEdges nếu muốn cho nó nối với source nào thì cho cái đó lên trước  */}
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        style={handleStyle}
      />
      {/* source thứ 2 */}
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default TextUpdaterNode;
