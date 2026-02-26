"use client";

import { useEffect, useRef, useState } from "react";
import ShowToast from "./ShowToast";

type Props = {
  onClose: () => void;
  onRecorded: (file: File) => void;
};

const VideoRecorder = ({ onClose, onRecorded }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  /* =============================
     ENABLE CAMERA (Permission Trigger)
  ============================== */
  const startCamera = async () => {
    try {
      setLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraEnabled(true);
      setLoading(false);
    } catch (error: any) {
      console.error("Camera error:", error);
      ShowToast(
        "Camera/Microphone permission denied. Please allow access.",
        "error"
      );
      setLoading(false);
    }
  };

  /* =============================
     CLEANUP WHEN MODAL CLOSES
  ============================== */
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  /* =============================
     START RECORDING
  ============================== */
  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const recorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      setRecordedChunks([...chunksRef.current]);
    };

    recorder.start();
    setIsRecording(true);
  };

  /* =============================
     STOP RECORDING
  ============================== */
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  /* =============================
     SUBMIT RECORDING
  ============================== */
  const handleSubmit = () => {
    if (recordedChunks.length === 0) return;

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const file = new File([blob], `recording-${Date.now()}.webm`, {
      type: "video/webm",
    });

    onRecorded(file);
    onClose();
  };

  return (
    <div className="modal show">
      <div className="modal-wrap" onClick={(e) => e.stopPropagation()}>
        <h3>Record Video</h3>

        {/* STEP 1 — Enable Camera */}
        {!cameraEnabled && !loading && (
          <button className="premium-btn" onClick={startCamera}>
            <span>Enable Camera</span>
          </button>
        )}

        {loading && <p>Opening camera...</p>}

        {/* Video Preview */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          width="100%"
          style={{
            borderRadius: "8px",
            display: cameraEnabled ? "block" : "none",
          }}
        />

        {/* Controls */}
        {cameraEnabled && (
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            {!isRecording && recordedChunks.length === 0 && (
              <button className="premium-btn" onClick={startRecording}>
                <span>Start Recording</span>
              </button>
            )}

            {isRecording && (
              <button className="btn-danger" onClick={stopRecording}>
                <span>Stop Recording</span>
              </button>
            )}

            {!isRecording && recordedChunks.length > 0 && (
              <>
                <button className="premium-btn" onClick={handleSubmit}>
                  <span>Use Recording</span>
                </button>

                <button
                  className="cate-back-btn"
                  onClick={() => setRecordedChunks([])}
                >
                  <span>Retake</span>
                </button>
              </>
            )}

            <button className="btn-danger" onClick={onClose}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;