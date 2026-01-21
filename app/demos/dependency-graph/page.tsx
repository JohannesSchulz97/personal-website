"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Link, Trash2, Move, Save, X, Info, ChevronDown } from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  dependencies: string[];
  description: string;
}

interface Category {
  name: string;
  color: string;
}

interface SavedVersion {
  id: string;
  name: string;
  nodes: Node[];
  createdAt: number;
}

interface ContextMenu {
  type?: 'canvas';
  nodeId?: string;
  x: number;
  y: number;
  canvasX?: number;
  canvasY?: number;
}

interface DraggingArrow {
  fromId: string;
  toId: string;
  currentX: number;
  currentY: number;
}

interface DrawingConnection {
  fromId: string;
  currentX: number;
  currentY: number;
}

interface RightClickStart {
  nodeId: string;
  x: number;
  y: number;
  time: number;
}

interface EditingCategory {
  index: number;
  name: string;
  color: string;
}

const STORAGE_KEY = 'dependencyGraph';

const loadFromStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
  return null;
};

const saveToStorage = (data: any) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

export default function DependencyGraphPage() {
  const defaultLayout: Node[] = [
    { id: 'ankle-knee', label: 'Ankle-Knee\nAnalysis', x: 0, y: 0, color: '#3b82f6', dependencies: [], description: 'Analyzes tibia inclination and knee position relative to gravity line. Identifies dorsiflexion stance (tibia forward) vs. hyperextension patterns. Foundation for all superior compensations.' },
    { id: 'knee-hip', label: 'Knee-Hip\nRelationship', x: 0, y: 0, color: '#3b82f6', dependencies: ['ankle-knee'], description: 'Examines femur positioning and hip-knee coordination. Determines if knee deviations propagate upward or get compensated. Critical for understanding lower chain mechanics.' },
    { id: 'pelvis', label: 'Pelvis\n(Tilt & Translation)', x: 0, y: 0, color: '#8b5cf6', dependencies: ['knee-hip', 'ankle-knee'], description: 'Assesses pelvic anterior/posterior tilt and forward/backward shift. Links lower body mechanics to spinal behavior. Key junction point determining lumbar curve and thorax positioning.' },
    { id: 'lumbar', label: 'Lumbar Spine\n(Lordosis/Kyphosis)', x: 0, y: 0, color: '#ec4899', dependencies: ['pelvis'], description: 'Evaluates lumbar curve in response to pelvic position. Identifies hyperextension, loss of lordosis, or kinetic breaks. Determines lumbosacral compression zones and spinal compensation strategies.' },
    { id: 'thorax', label: 'Thorax\n(Kyphosis)', x: 0, y: 0, color: '#ef4444', dependencies: ['lumbar'], description: 'Analyzes thoracic kyphosis, sternum position, and upper-lower thorax relationship. Determines if thorax compensates for lumbar patterns or creates independent deviations affecting breathing and shoulder mechanics.' },
    { id: 'trunk-pressure', label: 'Trunk Pressure\nDistribution', x: 0, y: 0, color: '#f59e0b', dependencies: ['pelvis', 'lumbar'], description: 'Identifies compression and shear zones in trunk. Analyzes ventral vs. dorsal tension patterns (EEC/CCC). Maps pressure distribution from pelvis through lumbar region.' },
    { id: 'cervical', label: 'Cervical-Head\n(Neck & Jaw)', x: 0, y: 0, color: '#dc2626', dependencies: ['thorax'], description: 'Examines forward head posture, cervical extension, and craniocervical junction. Determines if head position compensates for thorax or creates independent anterior shift. Includes jaw and occiput tension patterns.' },
    { id: 'shoulder', label: 'Shoulder-Arm\nRotation', x: 0, y: 0, color: '#f97316', dependencies: ['thorax'], description: 'Assesses shoulder elevation asymmetry and arm rotation patterns in response to thorax positioning. Secondary analysis complementing primary sagittal chain.' },
    { id: 'kinetic-breaks', label: 'Kinetic Breaks\nDetection', x: 0, y: 0, color: '#14b8a6', dependencies: ['lumbar', 'thorax'], description: 'Identifies discontinuities in kinetic chain where force transmission breaks down. Detects segments moving in opposite directions or rigid areas preventing natural compensatory flow.' },
    { id: 'integration', label: 'Integration\n(Spannungsdreieck)', x: 0, y: 0, color: '#6366f1', dependencies: ['pelvis', 'lumbar', 'thorax', 'cervical', 'trunk-pressure', 'kinetic-breaks', 'shoulder'], description: 'Synthesizes all node outputs into holistic pattern analysis. Identifies primary causative deviation, top-3 structural issues, and dominant compensation strategy. Determines correction priority: sternum → pelvis → head.' },
  ];

  const defaultCategories: Category[] = [
    { name: 'Lower Body', color: '#3b82f6' },
    { name: 'Pelvis', color: '#8b5cf6' },
    { name: 'Spine', color: '#ec4899' },
    { name: 'Upper Body', color: '#ef4444' },
    { name: 'Pressure', color: '#f59e0b' },
    { name: 'Integration', color: '#6366f1' },
    { name: 'Detection', color: '#14b8a6' },
  ];

  const noCategory: Category = { name: 'No Category', color: '#d1d5db' };

  const calculateLayeredLayout = (nodes: Node[]) => {
    const layers: Record<string, number> = {};
    const visited = new Set<string>();

    const assignLayer = (nodeId: string, layer: number) => {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;

      if (!layers[nodeId] || layers[nodeId] < layer) {
        layers[nodeId] = layer;
      }

      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      nodes.forEach(n => {
        if (n.dependencies.includes(nodeId)) {
          assignLayer(n.id, layer + 1);
        }
      });
    };

    nodes.forEach(node => {
      if (node.dependencies.length === 0) {
        assignLayer(node.id, 0);
      }
    });

    const countDownstream = (nodeId: string, countedSet = new Set<string>()): number => {
      if (countedSet.has(nodeId)) return 0;
      countedSet.add(nodeId);

      let count = 0;
      nodes.forEach(n => {
        if (n.dependencies.includes(nodeId)) {
          count += 1 + countDownstream(n.id, countedSet);
        }
      });
      return count;
    };

    const downstreamCounts: Record<string, number> = {};
    nodes.forEach(node => {
      downstreamCounts[node.id] = countDownstream(node.id);
    });

    const nodesByLayer: Record<number, string[]> = {};
    Object.entries(layers).forEach(([nodeId, layer]) => {
      if (!nodesByLayer[layer]) nodesByLayer[layer] = [];
      nodesByLayer[layer].push(nodeId);
    });

    Object.keys(nodesByLayer).forEach(layer => {
      nodesByLayer[Number(layer)].sort((a, b) => {
        const countDiff = downstreamCounts[b] - downstreamCounts[a];
        if (countDiff !== 0) return countDiff;
        return a.localeCompare(b);
      });
    });

    const layerSpacing = 250;
    const nodeSpacing = 150;
    const startX = 120;
    const centerY = 300;

    const positioned: Record<string, { x: number; y: number }> = {};
    Object.entries(nodesByLayer).forEach(([layer, nodeIds]) => {
      const layerX = startX + parseInt(layer) * layerSpacing;
      const totalHeight = (nodeIds.length - 1) * nodeSpacing;
      const layerStartY = centerY - totalHeight / 2;

      nodeIds.forEach((nodeId, index) => {
        positioned[nodeId] = {
          x: layerX,
          y: layerStartY + index * nodeSpacing
        };
      });
    });

    return positioned;
  };

  const positionedLayout = calculateLayeredLayout(defaultLayout);
  const defaultLayoutWithPositions = defaultLayout.map(node => ({
    ...node,
    x: positionedLayout[node.id]?.x || node.x,
    y: positionedLayout[node.id]?.y || node.y
  }));

  // Initialize with defaults to prevent hydration mismatch
  const [nodes, setNodes] = useState<Node[]>(defaultLayoutWithPositions);
  const [savedVersions, setSavedVersions] = useState<SavedVersion[]>([]);
  const [lastAutoSave, setLastAutoSave] = useState<Node[]>(defaultLayoutWithPositions);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored && stored.currentState && stored.currentState.nodes) {
      setNodes(stored.currentState.nodes);
      setSavedVersions(stored.savedVersions || []);
      setLastAutoSave(stored.currentState.nodes);
      setCategories(stored.categories || defaultCategories);
    }
    setMounted(true);
  }, []);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [connectionMode, setConnectionMode] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [descriptionNodeId, setDescriptionNodeId] = useState<string | null>(null);
  const [descriptionText, setDescriptionText] = useState('');
  const [editNodeName, setEditNodeName] = useState('');
  const [editNodeColor, setEditNodeColor] = useState('#3b82f6');
  const [connectionSource, setConnectionSource] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState<Node[][]>([]);
  const [deletedVersionsHistory, setDeletedVersionsHistory] = useState<SavedVersion[]>([]);
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);
  const [draggingArrow, setDraggingArrow] = useState<DraggingArrow | null>(null);
  const [drawingConnection, setDrawingConnection] = useState<DrawingConnection | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [rightClickStart, setRightClickStart] = useState<RightClickStart | null>(null);
  const [editingVersionId, setEditingVersionId] = useState<string | null>(null);
  const [editingVersionName, setEditingVersionName] = useState('');
  const [editingCategory, setEditingCategory] = useState<EditingCategory | 'new' | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#6b7280');

  const svgRef = useRef<SVGSVGElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getNodeDisplayColor = (nodeColor: string) => {
    const validCategory = categories.find(c => c.color === nodeColor);
    return validCategory ? nodeColor : noCategory.color;
  };

  const getCategoryName = (color: string) => {
    const cat = categories.find(c => c.color === color);
    return cat ? cat.name : noCategory.name;
  };

  const lineIntersectsNode = (x1: number, y1: number, x2: number, y2: number, nodeX: number, nodeY: number, padding = 10) => {
    const halfW = 75 + padding;
    const halfH = 30 + padding;
    const left = nodeX - halfW;
    const right = nodeX + halfW;
    const top = nodeY - halfH;
    const bottom = nodeY + halfH;

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    if (maxX < left || minX > right || maxY < top || minY > bottom) {
      return false;
    }

    const dx = x2 - x1;
    const dy = y2 - y1;

    const checkEdge = (edgeX1: number, edgeY1: number, edgeX2: number, edgeY2: number) => {
      const d1 = (edgeX2 - edgeX1) * (y1 - edgeY1) - (edgeY2 - edgeY1) * (x1 - edgeX1);
      const d2 = (edgeX2 - edgeX1) * (y2 - edgeY1) - (edgeY2 - edgeY1) * (x2 - edgeX1);
      const d3 = dx * (edgeY1 - y1) - dy * (edgeX1 - x1);
      const d4 = dx * (edgeY2 - y1) - dy * (edgeX2 - x1);
      return d1 * d2 < 0 && d3 * d4 < 0;
    };

    return checkEdge(left, top, right, top) ||
           checkEdge(right, top, right, bottom) ||
           checkEdge(right, bottom, left, bottom) ||
           checkEdge(left, bottom, left, top);
  };

  const calculateArrowPath = (startX: number, startY: number, endX: number, endY: number, sourceId: string, targetId: string) => {
    const obstacles = nodes.filter(n =>
      n.id !== sourceId && n.id !== targetId
    );

    const intersectingNodes = obstacles.filter(n =>
      lineIntersectsNode(startX, startY, endX, endY, n.x, n.y)
    );

    if (intersectingNodes.length === 0) {
      return { type: 'line', path: null };
    }

    const avgObstacleY = intersectingNodes.reduce((sum, n) => sum + n.y, 0) / intersectingNodes.length;
    const midY = (startY + endY) / 2;

    const goUp = avgObstacleY > midY;
    const offset = goUp ? -80 : 80;

    const midX = (startX + endX) / 2;
    const controlY = midY + offset;

    return {
      type: 'curve',
      path: `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`
    };
  };

  const wouldCreateCycle = (fromId: string, toId: string) => {
    const visited = new Set<string>();
    const queue = [fromId];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current === toId) return true;
      if (visited.has(current)) continue;
      visited.add(current);

      const node = nodes.find(n => n.id === current);
      if (node) {
        queue.push(...node.dependencies);
      }
    }
    return false;
  };

  const saveToHistory = () => {
    setHistory(prev => {
      const newHistory = [...prev, JSON.parse(JSON.stringify(nodes))];
      return newHistory.slice(-20);
    });
  };

  const undo = () => {
    if (deletedVersionsHistory.length > 0) {
      const lastDeleted = deletedVersionsHistory[deletedVersionsHistory.length - 1];
      setSavedVersions(prev => [...prev, lastDeleted]);
      setDeletedVersionsHistory(prev => prev.slice(0, -1));
      return;
    }
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setNodes(previousState);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    const data = {
      currentState: {
        nodes: nodes,
        lastModified: Date.now()
      },
      savedVersions: savedVersions,
      categories: categories
    };
    saveToStorage(data);
    setLastAutoSave(nodes);
  }, [nodes, savedVersions, categories]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowVersionDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveVersion = () => {
    const versionNumber = savedVersions.length + 1;
    const newVersion: SavedVersion = {
      id: `v-${Date.now()}`,
      name: `Version ${versionNumber}`,
      nodes: JSON.parse(JSON.stringify(nodes)),
      createdAt: Date.now()
    };

    setSavedVersions(prev => [...prev, newVersion]);
  };

  const loadVersion = (version: SavedVersion) => {
    saveToHistory();
    setNodes(JSON.parse(JSON.stringify(version.nodes)));
    setShowVersionDropdown(false);
  };

  const deleteVersion = (e: React.MouseEvent, versionId: string) => {
    e.stopPropagation();
    const versionToDelete = savedVersions.find(v => v.id === versionId);
    if (versionToDelete) {
      setDeletedVersionsHistory(prev => [...prev.slice(-19), versionToDelete]);
      setSavedVersions(prev => prev.filter(v => v.id !== versionId));
    }
  };

  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      currentState: nodes,
      savedVersions: savedVersions,
      categories: categories
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dependency-graph-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowVersionDropdown(false);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.currentState && Array.isArray(data.currentState)) {
          saveToHistory();
          setNodes(data.currentState);
          if (data.savedVersions && Array.isArray(data.savedVersions)) {
            setSavedVersions(data.savedVersions);
          }
          if (data.categories && Array.isArray(data.categories)) {
            setCategories(data.categories);
          }
          setErrorMessage('Import successful!');
          setTimeout(() => setErrorMessage(''), 2000);
        } else {
          setErrorMessage('Invalid file format');
          setTimeout(() => setErrorMessage(''), 3000);
        }
      } catch (err) {
        setErrorMessage('Failed to parse file');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setShowVersionDropdown(false);
  };

  const startEditingVersion = (e: React.MouseEvent, version: SavedVersion) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingVersionId(version.id);
    setEditingVersionName(version.name);
  };

  const saveVersionName = () => {
    if (editingVersionId && editingVersionName.trim()) {
      setSavedVersions(prev => prev.map(v =>
        v.id === editingVersionId ? { ...v, name: editingVersionName.trim() } : v
      ));
    }
    setEditingVersionId(null);
    setEditingVersionName('');
  };

  const resetToLastSave = () => {
    saveToHistory();
    const positioned = calculateLayeredLayout(lastAutoSave);
    const realignedNodes = lastAutoSave.map(node => ({
      ...node,
      x: positioned[node.id]?.x || node.x,
      y: positioned[node.id]?.y || node.y
    }));
    setNodes(realignedNodes);
  };

  const openDescriptionModal = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDescriptionNodeId(nodeId);
      setDescriptionText(node.description || '');
      setEditNodeName(node.label);
      setEditNodeColor(node.color);
      setShowDescriptionModal(true);
    }
  };

  const saveNodeDetails = () => {
    if (descriptionNodeId && editNodeName.trim()) {
      saveToHistory();
      setNodes(nodes.map(node =>
        node.id === descriptionNodeId
          ? {
              ...node,
              description: descriptionText,
              label: editNodeName.trim(),
              color: editNodeColor
            }
          : node
      ));
      setShowDescriptionModal(false);
      setDescriptionNodeId(null);
      setDescriptionText('');
      setEditNodeName('');
      setEditNodeColor('#3b82f6');
    }
  };

  const deleteNode = (nodeId: string) => {
    saveToHistory();
    setNodes(nodes
      .filter(n => n.id !== nodeId)
      .map(n => ({
        ...n,
        dependencies: n.dependencies.filter(d => d !== nodeId)
      }))
    );
    setContextMenu(null);
  };

  const changeNodeColor = (nodeId: string, color: string) => {
    saveToHistory();
    setNodes(nodes.map(node =>
      node.id === nodeId ? { ...node, color } : node
    ));
    setContextMenu(null);
  };

  const handleNodeClick = (e: React.MouseEvent, nodeId: string) => {
    if (connectionMode) {
      if (!connectionSource) {
        setConnectionSource(nodeId);
        setErrorMessage('');
      } else if (connectionSource === nodeId) {
        setConnectionSource(null);
        setErrorMessage('');
      } else {
        const targetNode = nodes.find(n => n.id === nodeId);

        if (targetNode?.dependencies.includes(connectionSource)) {
          setErrorMessage('Connection already exists');
          setConnectionSource(null);
          return;
        }

        if (wouldCreateCycle(connectionSource, nodeId)) {
          setErrorMessage('Cannot create circular dependency');
          setConnectionSource(null);
          return;
        }

        saveToHistory();
        setNodes(nodes.map(node =>
          node.id === nodeId
            ? { ...node, dependencies: [...node.dependencies, connectionSource] }
            : node
        ));
        setConnectionSource(null);
        setErrorMessage('');
      }
      e.stopPropagation();
    } else {
      setSelectedNode(nodeId);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (e.button === 0 && !connectionMode) {
      setDragging(nodeId);
      setSelectedNode(nodeId);
      e.preventDefault();
    }
  };

  const removeConnection = (fromId: string, toId: string) => {
    saveToHistory();
    setNodes(nodes.map(node =>
      node.id === toId
        ? { ...node, dependencies: node.dependencies.filter(dep => dep !== fromId) }
        : node
    ));
  };

  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (contextMenu) {
      setContextMenu(null);
    }

    if (e.target === svgRef.current || (e.target as SVGElement).tagName === 'svg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      setSelectedNode(null);
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }

    if (draggingArrow && svgRef.current) {
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      setDraggingArrow(prev => prev ? { ...prev, currentX: x, currentY: y } : null);
    }

    if (rightClickStart && !drawingConnection && svgRef.current) {
      const dx = e.clientX - rightClickStart.x;
      const dy = e.clientY - rightClickStart.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= 5) {
        const svg = svgRef.current;
        const rect = svg.getBoundingClientRect();
        const x = (e.clientX - rect.left - pan.x) / zoom;
        const y = (e.clientY - rect.top - pan.y) / zoom;
        setDrawingConnection({ fromId: rightClickStart.nodeId, currentX: x, currentY: y });
        setRightClickStart(null);
      }
    }

    if (drawingConnection && svgRef.current) {
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      setDrawingConnection(prev => prev ? { ...prev, currentX: x, currentY: y } : null);
    }
  };

  const handleSvgMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsPanning(false);

    if (draggingArrow) {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;

      const targetNode = nodes.find(n => {
        return Math.abs(n.x - x) < 75 && Math.abs(n.y - y) < 30;
      });

      if (targetNode && targetNode.id === draggingArrow.toId) {
        setDraggingArrow(null);
        return;
      }

      saveToHistory();

      if (targetNode && targetNode.id !== draggingArrow.fromId) {
        if (!targetNode.dependencies.includes(draggingArrow.fromId) && !wouldCreateCycle(draggingArrow.fromId, targetNode.id)) {
          setNodes(nodes.map(node => {
            if (node.id === draggingArrow.toId) {
              return { ...node, dependencies: node.dependencies.filter(d => d !== draggingArrow.fromId) };
            }
            if (node.id === targetNode.id) {
              return { ...node, dependencies: [...node.dependencies, draggingArrow.fromId] };
            }
            return node;
          }));
        } else {
          setNodes(nodes.map(node => {
            if (node.id === draggingArrow.toId) {
              return { ...node, dependencies: node.dependencies.filter(d => d !== draggingArrow.fromId) };
            }
            return node;
          }));
        }
      } else {
        setNodes(nodes.map(node => {
          if (node.id === draggingArrow.toId) {
            return { ...node, dependencies: node.dependencies.filter(d => d !== draggingArrow.fromId) };
          }
          return node;
        }));
      }
      setDraggingArrow(null);
    }

    if (drawingConnection) {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;

      const targetNode = nodes.find(n => {
        return Math.abs(n.x - x) < 75 && Math.abs(n.y - y) < 30;
      });

      if (targetNode && targetNode.id !== drawingConnection.fromId) {
        if (!targetNode.dependencies.includes(drawingConnection.fromId) && !wouldCreateCycle(drawingConnection.fromId, targetNode.id)) {
          saveToHistory();
          setNodes(nodes.map(node => {
            if (node.id === targetNode.id) {
              return { ...node, dependencies: [...node.dependencies, drawingConnection.fromId] };
            }
            return node;
          }));
        }
      }
      setDrawingConnection(null);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging && svgRef.current) {
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;

      setNodes(nodes.map(node =>
        node.id === dragging
          ? { ...node, x, y }
          : node
      ));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, nodes, zoom, pan]);

  const saveCurrentState = () => {
    setLastAutoSave(JSON.parse(JSON.stringify(nodes)));
    setErrorMessage('State saved (Ctrl+S)');
    setTimeout(() => setErrorMessage(''), 1500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveCurrentState();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history, nodes, deletedVersionsHistory, savedVersions]);

  const getDownstreamNodes = (nodeId: string) => {
    const downstream = new Set<string>();
    const queue = [nodeId];

    while (queue.length > 0) {
      const current = queue.shift()!;
      nodes.forEach(node => {
        if (node.dependencies.includes(current) && !downstream.has(node.id)) {
          downstream.add(node.id);
          queue.push(node.id);
        }
      });
    }

    return downstream;
  };

  const getUpstreamNodes = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return new Set<string>();

    const upstream = new Set<string>();
    const queue = [...node.dependencies];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (upstream.has(current)) continue;
      upstream.add(current);

      const currentNode = nodes.find(n => n.id === current);
      if (currentNode) {
        queue.push(...currentNode.dependencies);
      }
    }

    return upstream;
  };

  const highlightedNode = selectedNode || hoveredNode;
  const downstreamNodes = highlightedNode ? getDownstreamNodes(highlightedNode) : new Set<string>();
  const upstreamNodes = highlightedNode ? getUpstreamNodes(highlightedNode) : new Set<string>();

  return (
    <div className="w-full h-screen bg-background p-4 flex flex-col overflow-hidden">
      <div className="w-full bg-card rounded-lg shadow-lg p-6 flex flex-col h-full overflow-hidden border border-border">
        <div className="mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-foreground mb-2">Biomechanical Analysis - Node Dependency Graph</h2>

          <div className="flex items-start gap-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950/30 p-3 rounded mb-3">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <strong>Scroll</strong> to zoom. <strong>Drag canvas</strong> to pan. <strong>Drag nodes</strong> to move. <strong>Double-click node</strong> to edit description. <strong>Right-click + drag from node</strong> to create connection. <strong>Drag arrow head</strong> to reconnect.
              <div className="mt-2 flex gap-2 flex-wrap items-center">
                {categories.map((cat, index) => (
                  typeof editingCategory === 'object' && editingCategory?.index === index ? (
                    <div key={index} className="flex items-center gap-1 bg-background rounded-full px-2 py-1 border border-blue-300 shadow-sm">
                      <input
                        type="color"
                        value={editingCategory.color}
                        onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                        className="w-5 h-5 rounded-full border-0 cursor-pointer"
                        style={{ padding: 0 }}
                      />
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const newCategories = [...categories];
                            newCategories[index] = { name: editingCategory.name, color: editingCategory.color };
                            setCategories(newCategories);
                            setEditingCategory(null);
                          } else if (e.key === 'Escape') {
                            setEditingCategory(null);
                          }
                        }}
                        className="w-24 text-xs border-0 bg-transparent focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          const newCategories = [...categories];
                          newCategories[index] = { name: editingCategory.name, color: editingCategory.color };
                          setCategories(newCategories);
                          setEditingCategory(null);
                        }}
                        className="text-green-600 hover:text-green-800 text-xs"
                      >✓</button>
                      <button
                        onClick={() => {
                          const newCategories = categories.filter((_, i) => i !== index);
                          setCategories(newCategories);
                          setEditingCategory(null);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs ml-1"
                      >×</button>
                    </div>
                  ) : (
                    <span
                      key={index}
                      onClick={() => setEditingCategory({ index, name: cat.name, color: cat.color })}
                      className="flex items-center gap-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full px-2 py-0.5 transition-colors"
                      title="Click to edit category"
                    >
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }}></span>
                      {cat.name}
                    </span>
                  )
                ))}
                {editingCategory === 'new' ? (
                  <div className="flex items-center gap-1 bg-background rounded-full px-2 py-1 border border-blue-300 shadow-sm">
                    <input
                      type="color"
                      value={newCategoryColor}
                      onChange={(e) => setNewCategoryColor(e.target.value)}
                      className="w-5 h-5 rounded-full border-0 cursor-pointer"
                      style={{ padding: 0 }}
                    />
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newCategoryName.trim()) {
                          setCategories([...categories, { name: newCategoryName.trim(), color: newCategoryColor }]);
                          setNewCategoryName('');
                          setNewCategoryColor('#6b7280');
                          setEditingCategory(null);
                        } else if (e.key === 'Escape') {
                          setEditingCategory(null);
                          setNewCategoryName('');
                        }
                      }}
                      placeholder="Category name"
                      className="w-24 text-xs border-0 bg-transparent focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        if (newCategoryName.trim()) {
                          setCategories([...categories, { name: newCategoryName.trim(), color: newCategoryColor }]);
                          setNewCategoryName('');
                          setNewCategoryColor('#6b7280');
                          setEditingCategory(null);
                        }
                      }}
                      className="text-green-600 hover:text-green-800 text-xs"
                    >✓</button>
                    <button
                      onClick={() => {
                        setEditingCategory(null);
                        setNewCategoryName('');
                      }}
                      className="text-red-500 hover:text-red-700 text-xs ml-1"
                    >×</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingCategory('new')}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full px-2 py-0.5 transition-colors text-xs"
                    title="Add new category"
                  >
                    <span className="w-3 h-3 rounded-full border-2 border-dashed border-current flex items-center justify-center text-xs leading-none">+</span>
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded mb-3 text-sm">
              {errorMessage}
            </div>
          )}
        </div>

        <div className="relative flex-1 min-h-0">
          {showDescriptionModal && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => {
                setShowDescriptionModal(false);
                setDescriptionNodeId(null);
                setDescriptionText('');
                setEditNodeName('');
                setEditNodeColor('#3b82f6');
              }}
            >
              <div
                className="bg-card rounded-xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="px-6 py-4 border-b border-border"
                  style={{
                    background: `linear-gradient(135deg, ${editNodeColor}15 0%, ${editNodeColor}05 100%)`,
                    borderColor: `${editNodeColor}30`
                  }}
                >
                  <h3 className="text-lg font-semibold text-foreground">Edit Node</h3>
                  <p className="text-sm text-muted-foreground mt-1">Modify the node&apos;s name, category, and description</p>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Node Name</label>
                    <p className="text-xs text-muted-foreground mb-2">Use Enter for a second line (displayed in node)</p>
                    <textarea
                      value={editNodeName}
                      onChange={(e) => setEditNodeName(e.target.value)}
                      placeholder="Enter node name..."
                      rows={2}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat.color}
                          onClick={() => setEditNodeColor(cat.color)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all text-sm"
                          style={{
                            borderColor: editNodeColor === cat.color ? cat.color : '#e5e7eb',
                            backgroundColor: editNodeColor === cat.color ? `${cat.color}15` : 'transparent'
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-foreground">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                      placeholder="Describe what this node analyzes, its inputs, outputs, and key biomechanical considerations..."
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground leading-relaxed focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      style={{ minHeight: '160px', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <div className="px-6 py-4 bg-muted border-t border-border flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowDescriptionModal(false);
                      setDescriptionNodeId(null);
                      setDescriptionText('');
                      setEditNodeName('');
                      setEditNodeColor('#3b82f6');
                    }}
                    className="px-5 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNodeDetails}
                    disabled={!editNodeName.trim()}
                    className="px-5 py-2.5 text-white rounded-lg font-medium shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: editNodeColor }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {contextMenu && (
            contextMenu.type === 'canvas' ? (
              <div
                className="fixed bg-card rounded-lg shadow-xl border border-border py-1 z-50 min-w-44"
                style={{ left: contextMenu.x, top: contextMenu.y }}
                onMouseLeave={() => setContextMenu(null)}
              >
                <div className="px-3 py-2 border-b border-border">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Canvas</span>
                </div>
                <button
                  onClick={() => {
                    const newId = `node-${Date.now()}`;
                    saveToHistory();
                    setNodes([...nodes, {
                      id: newId,
                      label: 'New Node',
                      x: contextMenu.canvasX!,
                      y: contextMenu.canvasY!,
                      color: '#3b82f6',
                      dependencies: [],
                      description: ''
                    }]);
                    setContextMenu(null);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Node Here
                </button>
              </div>
            ) : (
              <div
                className="fixed bg-card rounded-lg shadow-xl border border-border py-1 z-50 min-w-48"
                style={{ left: contextMenu.x, top: contextMenu.y }}
                onMouseLeave={() => setContextMenu(null)}
              >
                {(() => {
                  const menuNode = nodes.find(n => n.id === contextMenu.nodeId);
                  return (
                    <>
                      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: menuNode?.color }}
                        />
                        <span className="text-sm font-medium text-foreground truncate">
                          {menuNode?.label.replace('\n', ' ')}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          openDescriptionModal(contextMenu.nodeId!);
                          setContextMenu(null);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                      >
                        <Info className="w-4 h-4" />
                        Edit Node
                      </button>

                      <div className="px-3 py-2 border-t border-border">
                        <div className="text-xs text-muted-foreground mb-2">Category</div>
                        <div className="flex flex-wrap gap-1">
                          {categories.map(cat => (
                            <button
                              key={cat.color}
                              onClick={() => changeNodeColor(contextMenu.nodeId!, cat.color)}
                              className="w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform"
                              style={{
                                backgroundColor: cat.color,
                                borderColor: menuNode?.color === cat.color ? '#1f2937' : 'transparent'
                              }}
                              title={cat.name}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => deleteNode(contextMenu.nodeId!)}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 border-t border-border"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Node
                      </button>
                    </>
                  );
                })()}
              </div>
            )
          )}

          <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
            <button
              onClick={() => setZoom(Math.min(3, zoom + 0.2))}
              className="p-2 bg-card text-foreground rounded-full shadow-lg hover:bg-muted border border-border w-10 h-10 flex items-center justify-center"
              title="Zoom In"
            >
              <Plus className="w-5 h-5" />
            </button>

            <button
              onClick={() => setZoom(Math.max(0.3, zoom - 0.2))}
              className="p-2 bg-card text-foreground rounded-full shadow-lg hover:bg-muted border border-border w-10 h-10 flex items-center justify-center"
              title="Zoom Out"
            >
              <span className="text-lg font-bold leading-none">−</span>
            </button>

            <div className="px-2 py-1 bg-card text-xs font-mono text-foreground rounded-full shadow-lg border border-border text-center w-10 h-10 flex items-center justify-center">
              {(zoom * 100).toFixed(0)}%
            </div>
          </div>

          <div className="absolute right-4 top-4 z-50" style={{ pointerEvents: 'auto' }} ref={dropdownRef}>
            <button
              onClick={() => setShowVersionDropdown(!showVersionDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-card hover:bg-muted rounded-lg border border-border text-sm font-medium text-foreground shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Versions ({savedVersions.length})</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showVersionDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-card rounded-lg shadow-xl border border-border overflow-hidden">
                <div className="p-2 border-b border-border bg-muted">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Saved Versions</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {savedVersions.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                      No saved versions yet.<br/>Click &quot;Save Version&quot; to create one.
                    </div>
                  ) : (
                    savedVersions.map(version => (
                      <div
                        key={version.id}
                        onClick={() => editingVersionId !== version.id && loadVersion(version)}
                        onContextMenu={(e) => startEditingVersion(e, version)}
                        className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                      >
                        <div className="flex-1 min-w-0">
                          {editingVersionId === version.id ? (
                            <input
                              type="text"
                              value={editingVersionName}
                              onChange={(e) => setEditingVersionName(e.target.value)}
                              onBlur={saveVersionName}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveVersionName();
                                if (e.key === 'Escape') {
                                  setEditingVersionId(null);
                                  setEditingVersionName('');
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full px-2 py-1 border border-blue-400 rounded text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 bg-background"
                              autoFocus
                            />
                          ) : (
                            <div className="font-medium text-foreground truncate" title="Right-click to rename">{version.name}</div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {new Date(version.createdAt).toLocaleDateString()} {new Date(version.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                        <button
                          onClick={(e) => deleteVersion(e, version.id)}
                          className="ml-2 p-1 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                          title="Delete version"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t border-border p-2 bg-muted flex gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50 rounded cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={importData}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={exportData}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="absolute right-4 bottom-4 z-50 flex flex-col gap-3" style={{ pointerEvents: 'auto' }}>
            <button
              onClick={resetToLastSave}
              onMouseEnter={() => setHoveredButton('reset')}
              onMouseLeave={() => setHoveredButton(null)}
              className="p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center transition-colors"
              style={{
                backgroundColor: hoveredButton === 'reset' ? '#4b5563' : '#6b7280',
                color: 'white',
              }}
              title="Realign Layout"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            {hoveredButton === 'reset' && (
              <div className="absolute right-20 top-5 bg-gray-800 text-white px-3 py-2 rounded text-sm whitespace-nowrap shadow-lg">
                Realign Layout
              </div>
            )}
            <button
              onClick={saveVersion}
              onMouseEnter={() => setHoveredButton('save')}
              onMouseLeave={() => setHoveredButton(null)}
              className="p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center transition-colors"
              style={{
                backgroundColor: hoveredButton === 'save' ? '#1d4ed8' : '#2563eb',
                color: 'white',
              }}
              title="Save Version"
            >
              <Save className="w-7 h-7" />
            </button>
            {hoveredButton === 'save' && (
              <div className="absolute right-20 bottom-5 bg-gray-800 text-white px-3 py-2 rounded text-sm whitespace-nowrap shadow-lg">
                Save Version
              </div>
            )}
          </div>

          <svg
            ref={svgRef}
            className="w-full h-full border border-border rounded bg-card"
            style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
            onMouseMove={handleSvgMouseMove}
            onMouseUp={handleSvgMouseUp}
            onMouseDown={handleSvgMouseDown}
            onContextMenu={(e) => {
              if (e.target === svgRef.current || (e.target as SVGElement).tagName === 'svg') {
                e.preventDefault();
                if (svgRef.current) {
                  const rect = svgRef.current.getBoundingClientRect();
                  const canvasX = (e.clientX - rect.left - pan.x) / zoom;
                  const canvasY = (e.clientY - rect.top - pan.y) / zoom;
                  setContextMenu({
                    type: 'canvas',
                    x: e.clientX,
                    y: e.clientY,
                    canvasX,
                    canvasY
                  });
                }
              }
            }}
            onWheel={(e) => {
              const delta = e.deltaY * -0.001;
              setZoom(prevZoom => Math.min(Math.max(0.3, prevZoom + delta), 3));
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 12 4, 0 8" fill="#94a3b8" />
              </marker>
              <marker
                id="arrowhead-highlight"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 12 4, 0 8" fill="#3b82f6" />
              </marker>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
              </filter>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {nodes.map(node =>
                node.dependencies.map(depId => {
                  const depNode = nodes.find(n => n.id === depId);
                  if (!depNode) return null;

                  const dx = node.x - depNode.x;
                  const dy = node.y - depNode.y;

                  const nodeWidth = 75;
                  const nodeHeight = 30;

                  const slope = Math.abs(dy / dx);
                  const edgeSlope = nodeHeight / nodeWidth;

                  let startX, startY;

                  if (slope < edgeSlope) {
                    if (dx > 0) {
                      startX = depNode.x + nodeWidth;
                    } else {
                      startX = depNode.x - nodeWidth;
                    }
                    startY = depNode.y + (dy / dx) * (startX - depNode.x);
                  } else {
                    if (dy > 0) {
                      startY = depNode.y + nodeHeight;
                    } else {
                      startY = depNode.y - nodeHeight;
                    }
                    startX = depNode.x + (dx / dy) * (startY - depNode.y);
                  }

                  let endX, endY;

                  if (slope < edgeSlope) {
                    if (dx > 0) {
                      endX = node.x - nodeWidth;
                    } else {
                      endX = node.x + nodeWidth;
                    }
                    endY = depNode.y + (dy / dx) * (endX - depNode.x);
                  } else {
                    if (dy > 0) {
                      endY = node.y - nodeHeight;
                    } else {
                      endY = node.y + nodeHeight;
                    }
                    endX = depNode.x + (dx / dy) * (endY - depNode.y);
                  }

                  const connectionKey = `${depId}-${node.id}`;
                  const isHoveredConnection = hoveredConnection === connectionKey;
                  const isHighlighted =
                    (highlightedNode === node.id && upstreamNodes.has(depId)) ||
                    (highlightedNode === depId && downstreamNodes.has(node.id)) ||
                    isHoveredConnection;

                  const isDraggingThis = draggingArrow && draggingArrow.fromId === depId && draggingArrow.toId === node.id;
                  const actualEndX = isDraggingThis ? draggingArrow.currentX : endX;
                  const actualEndY = isDraggingThis ? draggingArrow.currentY : endY;

                  const arrowPath = isDraggingThis
                    ? { type: 'line', path: null }
                    : calculateArrowPath(startX, startY, actualEndX, actualEndY, depId, node.id);

                  const strokeColor = isDraggingThis ? "#f59e0b" : (isHighlighted ? "#3b82f6" : "#cbd5e1");
                  const strokeW = isDraggingThis ? "3" : (isHighlighted ? "3" : "2");
                  const markerEnd = isDraggingThis ? "url(#arrowhead-highlight)" : (isHighlighted ? "url(#arrowhead-highlight)" : "url(#arrowhead)");
                  const opacityVal = isDraggingThis ? "1" : (isHighlighted ? "1" : "0.4");

                  return (
                    <g key={connectionKey}>
                      {arrowPath.type === 'line' ? (
                        <>
                          <line
                            x1={startX}
                            y1={startY}
                            x2={actualEndX}
                            y2={actualEndY}
                            stroke={strokeColor}
                            strokeWidth={strokeW}
                            markerEnd={markerEnd}
                            opacity={opacityVal}
                            fill="none"
                            onContextMenu={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeConnection(depId, node.id);
                            }}
                            onMouseEnter={() => setHoveredConnection(connectionKey)}
                            onMouseLeave={() => setHoveredConnection(null)}
                            style={{ cursor: 'pointer' }}
                          />
                          <line
                            x1={startX}
                            y1={startY}
                            x2={actualEndX}
                            y2={actualEndY}
                            stroke="transparent"
                            strokeWidth="12"
                            onContextMenu={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeConnection(depId, node.id);
                            }}
                            onMouseEnter={() => setHoveredConnection(connectionKey)}
                            onMouseLeave={() => setHoveredConnection(null)}
                            style={{ cursor: 'pointer' }}
                          />
                        </>
                      ) : (
                        <>
                          <path
                            d={arrowPath.path!}
                            stroke={strokeColor}
                            strokeWidth={strokeW}
                            markerEnd={markerEnd}
                            opacity={opacityVal}
                            fill="none"
                            onContextMenu={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeConnection(depId, node.id);
                            }}
                            onMouseEnter={() => setHoveredConnection(connectionKey)}
                            onMouseLeave={() => setHoveredConnection(null)}
                            style={{ cursor: 'pointer' }}
                          />
                          <path
                            d={arrowPath.path!}
                            stroke="transparent"
                            strokeWidth="12"
                            fill="none"
                            onContextMenu={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeConnection(depId, node.id);
                            }}
                            onMouseEnter={() => setHoveredConnection(connectionKey)}
                            onMouseLeave={() => setHoveredConnection(null)}
                            style={{ cursor: 'pointer' }}
                          />
                        </>
                      )}
                      {(() => {
                        const dx = actualEndX - startX;
                        const dy = actualEndY - startY;
                        const len = Math.sqrt(dx * dx + dy * dy);
                        if (len === 0) return null;
                        const tipX = actualEndX;
                        const tipY = actualEndY;
                        const perpX = -dy / len * 15;
                        const perpY = dx / len * 15;
                        const backX = actualEndX - (dx / len) * 25;
                        const backY = actualEndY - (dy / len) * 25;
                        return (
                          <polygon
                            points={`${tipX},${tipY} ${backX + perpX},${backY + perpY} ${backX - perpX},${backY - perpY}`}
                            fill="transparent"
                            style={{ cursor: isDraggingThis ? 'grabbing' : 'grab' }}
                            onMouseDown={(e) => {
                              if (e.button === 0) {
                                e.preventDefault();
                                e.stopPropagation();
                                setDraggingArrow({ fromId: depId, toId: node.id, currentX: endX, currentY: endY });
                              }
                            }}
                            onMouseEnter={() => !draggingArrow && setHoveredConnection(connectionKey)}
                            onMouseLeave={() => !draggingArrow && setHoveredConnection(null)}
                          />
                        );
                      })()}
                    </g>
                  );
                })
              )}

              {nodes.map(node => {
                const isSelected = selectedNode === node.id;
                const isHovered = hoveredNode === node.id;
                const isUpstream = highlightedNode && upstreamNodes.has(node.id);
                const isDownstream = highlightedNode && downstreamNodes.has(node.id);
                const isHighlighted = isSelected || isHovered || isUpstream || isDownstream;
                const isConnectionSource = connectionSource === node.id;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      if (e.button === 2) {
                        setRightClickStart({
                          nodeId: node.id,
                          x: e.clientX,
                          y: e.clientY,
                          time: Date.now()
                        });
                      } else {
                        handleMouseDown(e as any, node.id);
                      }
                    }}
                    onMouseUp={(e) => {
                      if (drawingConnection && drawingConnection.fromId !== node.id) {
                        if (!node.dependencies.includes(drawingConnection.fromId) && !wouldCreateCycle(drawingConnection.fromId, node.id)) {
                          saveToHistory();
                          setNodes(nodes.map(n => {
                            if (n.id === node.id) {
                              return { ...n, dependencies: [...n.dependencies, drawingConnection.fromId] };
                            }
                            return n;
                          }));
                        }
                        setDrawingConnection(null);
                        setRightClickStart(null);
                        return;
                      }

                      if (draggingArrow && draggingArrow.fromId !== node.id) {
                        if (node.id === draggingArrow.toId) {
                          setDraggingArrow(null);
                          return;
                        }
                        if (!node.dependencies.includes(draggingArrow.fromId) && !wouldCreateCycle(draggingArrow.fromId, node.id)) {
                          saveToHistory();
                          setNodes(nodes.map(n => {
                            if (n.id === draggingArrow.toId) {
                              return { ...n, dependencies: n.dependencies.filter(d => d !== draggingArrow.fromId) };
                            }
                            if (n.id === node.id) {
                              return { ...n, dependencies: [...n.dependencies, draggingArrow.fromId] };
                            }
                            return n;
                          }));
                        } else {
                          saveToHistory();
                          setNodes(nodes.map(n => {
                            if (n.id === draggingArrow.toId) {
                              return { ...n, dependencies: n.dependencies.filter(d => d !== draggingArrow.fromId) };
                            }
                            return n;
                          }));
                        }
                        setDraggingArrow(null);
                        return;
                      }

                      if (e.button === 2 && rightClickStart && rightClickStart.nodeId === node.id) {
                        const dx = e.clientX - rightClickStart.x;
                        const dy = e.clientY - rightClickStart.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 5) {
                          setContextMenu({
                            nodeId: node.id,
                            x: e.clientX,
                            y: e.clientY
                          });
                          setDrawingConnection(null);
                        }
                        setRightClickStart(null);
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(e as any, node.id);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      openDescriptionModal(node.id);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: connectionMode ? 'pointer' : (dragging === node.id ? 'grabbing' : 'grab') }}
                  >
                    <rect
                      x="-75"
                      y="-30"
                      width="150"
                      height="60"
                      rx="8"
                      fill={getNodeDisplayColor(node.color)}
                      opacity={isHighlighted || isConnectionSource ? "1" : "0.7"}
                      stroke={isConnectionSource ? "#fbbf24" : (isSelected ? "#1e40af" : (isHovered ? "#3b82f6" : "white"))}
                      strokeWidth={isConnectionSource ? "4" : (isSelected || isHovered ? "3" : "2")}
                      filter={isHighlighted || isConnectionSource ? "url(#shadow)" : "none"}
                    />
                    {node.label.split('\n').map((line, i) => (
                      <text
                        key={i}
                        y={-8 + i * 16}
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontWeight={isHighlighted ? "600" : "500"}
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {line}
                      </text>
                    ))}
                    {isConnectionSource && (
                      <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill="#fbbf24"
                        style={{ pointerEvents: 'none' }}
                      />
                    )}
                  </g>
                );
              })}

              {nodes.map(node => {
                const isHovered = hoveredNode === node.id;
                if (!isHovered || !node.description) return null;

                const hasNodeBelow = nodes.some(n =>
                  n.id !== node.id &&
                  n.y > node.y && n.y < node.y + 150 &&
                  Math.abs(n.x - node.x) < 200
                );
                const hasNodeAbove = nodes.some(n =>
                  n.id !== node.id &&
                  n.y < node.y && n.y > node.y - 150 &&
                  Math.abs(n.x - node.x) < 200
                );
                const hasNodeToRight = nodes.some(n =>
                  n.id !== node.id &&
                  n.x > node.x && n.x < node.x + 350 &&
                  Math.abs(n.y - node.y) < 100
                );

                let tooltipX, tooltipY;
                if (!hasNodeBelow) {
                  tooltipX = node.x - 125;
                  tooltipY = node.y + 70;
                } else if (!hasNodeAbove) {
                  tooltipX = node.x - 125;
                  tooltipY = node.y - 180;
                } else if (!hasNodeToRight) {
                  tooltipX = node.x + 85;
                  tooltipY = node.y - 30;
                } else {
                  tooltipX = node.x - 335;
                  tooltipY = node.y - 30;
                }

                return (
                  <g key={`tooltip-${node.id}`} style={{ pointerEvents: 'none' }}>
                    <foreignObject x={tooltipX} y={tooltipY} width="250" height="300" style={{ pointerEvents: 'none' }}>
                      <div className="bg-gray-800 text-white text-xs p-3 rounded shadow-lg" style={{ pointerEvents: 'none' }}>
                        {node.description}
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {drawingConnection && (() => {
                const fromNode = nodes.find(n => n.id === drawingConnection.fromId);
                if (!fromNode) return null;
                return (
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={drawingConnection.currentX}
                    y2={drawingConnection.currentY}
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                    markerEnd="url(#arrowhead-highlight)"
                    style={{ pointerEvents: 'none' }}
                  />
                );
              })()}
            </g>
          </svg>
        </div>

        <div className="mt-4 h-36 flex-shrink-0">
          {selectedNode ? (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 h-full overflow-auto">
              <div className="mb-2">
                <h3 className="font-semibold text-foreground">
                  {nodes.find(n => n.id === selectedNode)?.label.replace('\n', ' ')}
                </h3>
              </div>
              <div className="text-sm text-foreground space-y-1">
                <div>
                  <strong>Depends on:</strong> {
                    upstreamNodes.size > 0
                      ? Array.from(upstreamNodes).map(id => nodes.find(n => n.id === id)?.label.split('\n')[0]).join(', ')
                      : 'None (independent)'
                  }
                </div>
                <div>
                  <strong>Required by:</strong> {
                    downstreamNodes.size > 0
                      ? Array.from(downstreamNodes).map(id => nodes.find(n => n.id === id)?.label.split('\n')[0]).join(', ')
                      : 'None (terminal node)'
                  }
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
                  <button
                    onClick={() => openDescriptionModal(selectedNode)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View/Edit Description
                  </button>
                  <span className="text-xs text-muted-foreground">Right-click arrow to delete | Double-click node to edit</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-muted rounded-lg border border-border h-full flex items-center justify-center text-muted-foreground text-sm">
              Click on a node to see its details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
