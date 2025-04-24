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
import io from "socket.io-client";
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
  const socket = io("http://localhost:3000"); // URL backend

  const res = useGetFlowByIdQuery({ id: 3 });
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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
  }, []);

  // useEffect(() => {
  //   if (edges.length > 0 && nodes.length > 0) {
  //     socket.emit("change-flow", {
  //       _id: 3,
  //       nodes: JSON.stringify(nodes),
  //       edges: JSON.stringify(edges),
  //     });
  //   }
  // }, [nodes, edges]);

  // socket.on("flow-updated", (data) => {
  //   setNodes((nds) => nds.concat(data.nodes));
  //   setEdges((nds) => nds.concat(data.edges));
  // });

  console.log("nodes: ", nodes);
  return (
    <div className="h-full">
      <Button type="primary" onClick={handleSave} loading={insert.isLoading}>
        Lưu
      </Button>
      <Button onClick={handleAdd}>Add</Button>
      {/* {nodes?.nodes?.length > 0 && ( */}
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
      {/* )} */}
    </div>
  );
}
