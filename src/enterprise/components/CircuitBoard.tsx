/**
 * Circuit Board Background Animation
 * Interactive circuit patterns that light up with mouse movement
 * Futuristic design with dynamic node connections
 */

import React, { useEffect, useRef, useState } from 'react';
import '../styles/circuit-board.css';

interface CircuitNode {
    x: number;
    y: number;
    radius: number;
    isActive: boolean;
    energy: number;
    connections: number[];
}

interface CircuitLine {
    from: number;
    to: number;
    isActive: boolean;
    energy: number;
}

interface CircuitBoardProps {
    theme: 'light' | 'dark';
    intensity?: number;
    interactive?: boolean;
}

export const CircuitBoard: React.FC<CircuitBoardProps> = ({
    theme = 'dark',
    intensity = 0.6,
    interactive = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [nodes, setNodes] = useState<CircuitNode[]>([]);
    const [lines, setLines] = useState<CircuitLine[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const animationRef = useRef<number>();

    const getThemeColors = () => {
        const colors =
            theme === 'dark'
                ? {
                    nodeBase: 'rgba(0, 217, 255, 0.3)',
                    nodeActive: 'rgba(0, 217, 255, 0.8)',
                    nodeGlow: 'rgba(212, 175, 55, 1)',
                    lineBase: 'rgba(0, 217, 255, 0.2)',
                    lineActive: 'rgba(212, 175, 55, 0.6)',
                    glowColor: 'rgba(0, 217, 255, 0.4)',
                    goldGlow: 'rgba(212, 175, 55, 0.5)',
                }
                : {
                    nodeBase: 'rgba(212, 175, 55, 0.3)',
                    nodeActive: 'rgba(212, 175, 55, 0.7)',
                    nodeGlow: 'rgba(44, 62, 80, 1)',
                    lineBase: 'rgba(212, 175, 55, 0.2)',
                    lineActive: 'rgba(212, 175, 55, 0.5)',
                    glowColor: 'rgba(212, 175, 55, 0.3)',
                    goldGlow: 'rgba(212, 175, 55, 0.4)',
                };
        return colors;
    };

    // Initialize circuit nodes and connections
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { width, height } = canvas;
        const nodeCount = Math.floor((width * height) / 25000);
        const newNodes: CircuitNode[] = [];

        // Generate random nodes
        for (let i = 0; i < nodeCount; i++) {
            newNodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                isActive: Math.random() > 0.7,
                energy: 0,
                connections: [],
            });
        }

        // Create connections between nearby nodes
        const newLines: CircuitLine[] = [];
        for (let i = 0; i < newNodes.length; i++) {
            for (let j = i + 1; j < newNodes.length; j++) {
                const dx = newNodes[i].x - newNodes[j].x;
                const dy = newNodes[i].y - newNodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    newLines.push({
                        from: i,
                        to: j,
                        isActive: false,
                        energy: 0,
                    });
                    newNodes[i].connections.push(j);
                    newNodes[j].connections.push(i);
                }
            }
        }

        setNodes(newNodes);
        setLines(newLines);
    }, []);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const colors = getThemeColors();

        const animate = () => {
            // Clear canvas
            ctx.fillStyle = theme === 'dark' ? '#0A0E27' : '#F5F3F0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodes.forEach((node, index) => {
                // Calculate distance to mouse
                const dx = node.x - mousePos.x;
                const dy = node.y - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const isNearMouse = interactive && distance < 150;

                // Update energy
                if (isNearMouse) {
                    node.energy = Math.min(1, node.energy + 0.1);
                } else {
                    node.energy = Math.max(0, node.energy - 0.02);
                }

                // Draw node
                const nodeRadius = node.radius * (1 + node.energy * 1.5);
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = node.energy > 0.5 ? colors.nodeActive : colors.nodeBase;
                ctx.fill();

                // Glow effect
                if (node.energy > 0.3) {
                    ctx.shadowColor = colors.goldGlow;
                    ctx.shadowBlur = 15 * node.energy;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, nodeRadius + 2, 0, Math.PI * 2);
                    ctx.strokeStyle = colors.nodeGlow;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            });

            // Draw connections
            lines.forEach((line) => {
                const fromNode = nodes[line.from];
                const toNode = nodes[line.to];

                if (!fromNode || !toNode) return;

                const connectionEnergy = (fromNode.energy + toNode.energy) / 2;

                if (connectionEnergy > 0.1) {
                    ctx.strokeStyle = connectionEnergy > 0.5 ? colors.lineActive : colors.lineBase;
                    ctx.lineWidth = 1 + connectionEnergy * 2;
                    ctx.beginPath();
                    ctx.moveTo(fromNode.x, fromNode.y);
                    ctx.lineTo(toNode.x, toNode.y);
                    ctx.stroke();

                    // Add glow to active connections
                    if (connectionEnergy > 0.4) {
                        ctx.shadowColor = colors.glowColor;
                        ctx.shadowBlur = 10 * connectionEnergy;
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                    }
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [nodes, lines, mousePos, theme, interactive]);

    // Mouse move handler
    useEffect(() => {
        if (!interactive) return;

        const handleMouseMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [interactive]);

    // Handle canvas resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`circuit-board circuit-board--${theme}`}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                opacity: intensity,
            }}
        />
    );
};

export default CircuitBoard;
