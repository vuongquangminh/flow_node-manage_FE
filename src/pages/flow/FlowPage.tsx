import {
  addEdge,
  Background,
  Connection,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback, useEffect } from "react";
import TextUpdaterNode from "./customNode/TextUpdaterNode";
import { Button } from "antd";
import {
  useAddFlowMutation,
  useGetFlowByIdQuery,
} from "../../store/services/FlowService";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};
const rfStyle = {
  backgroundColor: "#B8CEFF",
};

export default function FlowPage() {
  const res = useGetFlowByIdQuery({ id: 2 });
  console.log("res: ", res);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [doCreate, insert] = useAddFlowMutation();
  const id: string = (nodes.length + 1).toString();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSave = () => {
    doCreate({
      nodes: JSON.stringify(nodes),
      edges: JSON.stringify(edges),
    }).then(() => console.log("success!"));
  };

  const handleAdd = () => {
    const newNode = {
      id,
      type: "default",
      position: {
        x: 0,
        y: 0,
      },
      data: { label: `Node ${id}` },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  useEffect(() => {
    if (res.data) {
      try {
        const parsedNodes = JSON.parse(res.data.nodes);
        const parsedEdges = JSON.parse(res.data.edges);
        setNodes(parsedNodes);
        setEdges(parsedEdges);
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu:", error);
      }
    }
  }, [res.data]);
  return (
    <div className="h-full">
      <Button type="primary" onClick={handleSave} loading={insert.isLoading}>
        Lưu
      </Button>
      <Button onClick={handleAdd}>Add</Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      >
        <Controls />
        <MiniMap />
        <Background gap={18} size={1} />
      </ReactFlow>
    </div>
  );
}
