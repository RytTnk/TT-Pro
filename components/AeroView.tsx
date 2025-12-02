import React, { useRef, useState, useEffect } from 'react';
import { Upload, Play, Pause, RefreshCw, Crosshair, HelpCircle } from 'lucide-react';

const AeroView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [analysisActive, setAnalysisActive] = useState(false);
  
  // Simulation State for CdA
  const [power, setPower] = useState(300);
  const [speed, setSpeed] = useState(40);
  const [crr, setCrr] = useState(0.004);
  const [airDensity, setAirDensity] = useState(1.225);
  const [cdaResult, setCdaResult] = useState<string>("0.000");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // F-2-3: Simplified "Marker" Detection Logic (Visual Simulation)
  // Since we can't easily perform robust computer vision on arbitrary user video in this contained environment,
  // we will visualize the analysis loop that *would* happen.
  useEffect(() => {
    let animationFrameId: number;
    
    const analyzeFrame = () => {
      if (!videoRef.current || !canvasRef.current || !analysisActive) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx || video.paused || video.ended) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // 1. Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // 2. Simulate finding a marker (e.g., knee or hip)
      // We'll calculate a position based on time to simulate tracking movement
      const t = Date.now() / 500;
      const hipX = canvas.width * 0.4;
      const hipY = canvas.height * 0.4 + Math.sin(t) * 10; // Bobbing motion
      
      const kneeX = canvas.width * 0.45 + Math.cos(t) * 20;
      const kneeY = canvas.height * 0.6 + Math.sin(t) * 40; // Pedaling motion
      
      // Draw Analysis Overlay
      ctx.strokeStyle = '#0ea5e9'; // Sky blue
      ctx.lineWidth = 3;
      
      // Hip Joint
      ctx.beginPath();
      ctx.arc(hipX, hipY, 8, 0, Math.PI * 2);
      ctx.stroke();
      
      // Knee Joint
      ctx.beginPath();
      ctx.arc(kneeX, kneeY, 8, 0, Math.PI * 2);
      ctx.stroke();
      
      // Connecting line (Femur)
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.stroke();

      // Text Data
      ctx.font = '20px monospace';
      ctx.fillStyle = '#0ea5e9';
      ctx.fillText(`Hip Angle: ${(45 + Math.sin(t) * 5).toFixed(1)}°`, 20, 40);
      
      animationFrameId = requestAnimationFrame(analyzeFrame);
    };

    if (isPlaying && analysisActive) {
      analyzeFrame();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, analysisActive]);

  // F-2-4: CdA Calculation
  const calculateCdA = () => {
    // Very simplified physics model: Power = (0.5 * rho * CdA * v^3) + (Crr * mass * g * v)
    // Solving for CdA (ignoring drivetrain loss and slope for simplicity of the UI demo)
    // CdA = (Power / v - Crr * mass * g) / (0.5 * rho * v^2)
    // Assume flat ground, no wind.
    
    const v = speed / 3.6; // km/h to m/s
    const mass = 80; // kg (rider + bike)
    const g = 9.81;
    
    const rollingResistancePower = crr * mass * g * v;
    const aeroPower = power - rollingResistancePower;
    
    if (aeroPower <= 0) {
        setCdaResult("Invalid Params");
        return;
    }

    const cda = aeroPower / (0.5 * airDensity * Math.pow(v, 3));
    setCdaResult(cda.toFixed(3));
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
       <header>
        <h2 className="text-3xl font-bold text-white mb-2">Aero Lab</h2>
        <p className="text-slate-400">Analyze position and estimate aerodynamic efficiency.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Video Analysis Section (F-2-1, F-2-2, F-2-3) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Crosshair size={20} className="text-blue-500"/> 
                    Motion Analysis
                </h3>
                <div className="flex space-x-2">
                     <button 
                        onClick={() => setAnalysisActive(!analysisActive)}
                        className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${analysisActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                     >
                        {analysisActive ? 'AI Overlay On' : 'AI Overlay Off'}
                     </button>
                </div>
            </div>

            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center group">
                {!videoSrc && (
                    <div className="text-center p-8">
                        <Upload size={48} className="mx-auto text-slate-600 mb-4" />
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                            Upload Side-View Video
                            <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                        </label>
                        <p className="text-xs text-slate-500 mt-4">Supports .mp4, .mov (Client-side processing)</p>
                    </div>
                )}
                {videoSrc && (
                    <>
                        <video 
                            ref={videoRef}
                            src={videoSrc} 
                            className="absolute inset-0 w-full h-full object-contain"
                            onEnded={() => setIsPlaying(false)}
                            loop
                            muted
                        />
                        <canvas 
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                        />
                         {/* Controls Overlay */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={togglePlay}
                                className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white"
                            >
                                {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                            </button>
                        </div>
                    </>
                )}
            </div>
            {videoSrc && <p className="text-xs text-slate-500">* AI Pose estimation is simulated in this demo. Real implementation would use MediaPipe.</p>}
        </div>

        {/* Virtual CdA Calculator (F-2-4) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <RefreshCw size={20} className="text-green-500"/>
                Virtual CdA Estimator
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Avg Power (Watts)</label>
                        <input 
                            type="number" 
                            value={power} 
                            onChange={(e) => setPower(Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Speed (km/h)</label>
                        <input 
                            type="number" 
                            value={speed} 
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Air Density (kg/m³)</label>
                        <input 
                            type="number" 
                            value={airDensity} 
                            step="0.001"
                            onChange={(e) => setAirDensity(Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-sm font-medium mb-2">Estimated CdA</span>
                    <span className="text-4xl font-mono font-bold text-blue-400">{cdaResult}</span>
                    <span className="text-xs text-slate-600 mt-2">m²</span>
                    
                    <button 
                        onClick={calculateCdA}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Calculate
                    </button>
                </div>
            </div>
            
            <div className="mt-6 bg-slate-800/50 p-4 rounded-lg flex gap-3">
                <HelpCircle className="text-slate-400 flex-shrink-0" size={20} />
                <p className="text-xs text-slate-400 leading-relaxed">
                    This simple model assumes 0% gradient and 0 wind speed. For accurate field testing, conduct "Chung Method" loops using a dedicated power meter and speed sensor data.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AeroView;