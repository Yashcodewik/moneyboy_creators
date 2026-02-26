"use client";
import { useEffect, useRef, useState } from "react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import { showError, showSuccess, showWarning, showInfo, showQuestion } from "@/utils/alert";
import { CgClose } from "react-icons/cg";

type Props = {
  onClose: () => void;
  onRecorded: (file: File) => void;
};

const VideoRecorder = ({ onClose, onRecorded }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const playbackUrlRef = useRef<string | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ========== ENABLE CAMERA ========== */
  const startCamera = async () => {
    try {
      setLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play();
      }

      setCameraEnabled(true);
    } catch (error) {
      console.error(error);
      showError("Camera/Microphone permission denied. Please allow access.");
    } finally { setLoading(false); }
  };

  /* ========== CLEANUP CAMERA ========== */
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraEnabled(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
    };
  }, []);

  useEffect(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setPlaybackUrl(url);
    }
  }, [recordedChunks]);

  /* ========== START RECORDING ========== */
  const startRecording = () => {
    if (!streamRef.current) { showWarning("Please enable camera first"); return; }
    chunksRef.current = [];
    const recorder = new MediaRecorder(streamRef.current, { mimeType: "video/webm;codecs=vp8,opus", });
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (event) => { if (event.data.size > 0) chunksRef.current.push(event.data); };
    recorder.onstop = () => { setRecordedChunks([...chunksRef.current]); };
    recorder.start();
    setIsRecording(true);
  };

  /* ========== STOP RECORDING ========== */
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  /* ========== RETAKE VIDEO ========== */
  const retakeVideo = () => {
    setRecordedChunks([]);
    chunksRef.current = [];

    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.muted = true;
      videoRef.current.controls = false;
      videoRef.current.play();
    }
  };

  /* ========== SUBMIT VIDEO ========== */
  const handleSubmit = () => {
    if (!recordedChunks.length) {
      showWarning("Please record a video first");
      return;
    }

    const blob = new Blob(recordedChunks, { type: "video/webm" });

    if (blob.size < 5000) {
      showWarning("Recording too short. Please record again.");
      return;
    }

    const file = new File([blob], `recording-${Date.now()}.webm`, {
      type: "video/webm",
    });

    onRecorded(file);
    showSuccess("Video recorded successfully");
    handleClose();
  };

  /* ========== CLOSE HANDLER ========== */
  const handleClose = async () => {
    if (isRecording) {
      const ok = await showQuestion("Recording is in progress. Cancel recording?");
      if (!ok) return;
    }
    if (recordedChunks.length > 0) {
      showInfo("Recording cancelled");
    }

    stopCamera();
    onClose();
  };

  /* ========== PLAYBACK PREVIEW ========== */
  useEffect(() => {
    if (!videoRef.current) return;

    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });

      if (playbackUrlRef.current) {
        URL.revokeObjectURL(playbackUrlRef.current);
      }
      playbackUrlRef.current = URL.createObjectURL(blob);
      videoRef.current.srcObject = null;
      videoRef.current.src = playbackUrlRef.current;
      videoRef.current.muted = false;
      videoRef.current.controls = true;
      videoRef.current.play();
    }
  }, [recordedChunks]);

  return (
    <div className="modal show" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" onClick={handleClose}>
      <div className="modal-wrap videorecord-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>
          <CgClose size={22} />
        </button>
        <h3 id="video-modal-title" className="title">Record Video</h3>
        <div className="video_wrap">

          {cameraEnabled && !playbackUrl && (
            <video ref={videoRef} autoPlay muted playsInline width="100%" style={{ borderRadius: 8 }}/>
          )}
          {playbackUrl && (
            <Plyr source={{type: "video", sources: [{src: playbackUrl, type: "video/webm",},],}}
              options={{controls: [ "play", "progress", "current-time", "mute", "volume", "fullscreen",],}}/>
          )}
        </div>
        {loading && (<div className="loadingtext">{"Loading".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>{char}</span>))}</div>)}
        <div className="actions">
          {!cameraEnabled && !loading && (
            <button className="premium-btn active-down-effect" onClick={startCamera}><span>Enable Camera</span></button>
          )}
          {cameraEnabled && !isRecording && recordedChunks.length === 0 && (
            <button className="premium-btn active-down-effect" onClick={startRecording}><span>Start Recording</span></button>
          )}
          {isRecording && (
            <button className="btn-danger active-down-effect" onClick={stopRecording}><span>Stop Recording</span></button>
          )}
          {!isRecording && recordedChunks.length > 0 && (
            <>
              <button className="premium-btn active-down-effect" onClick={handleSubmit}><span>Use Recording</span></button>
              <button className="btn-primary active-down-effect" onClick={retakeVideo}><span>Retake</span></button>
            </>
          )}
          <button className="btn-danger" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;