import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.play().catch(console.error);
      } else {
        video.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://hitekgroup.vn/wp-content/uploads/2025/07/0919-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Quản lý
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Hitek Group
              </span>
            </h1>

            {/* Subtitle */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                DẪN ĐẦU XU THẾ
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light">
                NỀN CÔNG NGHỆ VIỆT NAM
              </p>
            </div>

            {/* Country Flags */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <img 
                  src="https://flagcdn.com/w40/vn.png" 
                  alt="Vietnam" 
                  className="w-8 h-6 object-cover rounded"
                />
                <span className="text-white text-sm font-medium">Việt Nam</span>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <img 
                  src="https://flagcdn.com/w40/kr.png" 
                  alt="South Korea" 
                  className="w-8 h-6 object-cover rounded"
                />
                <span className="text-white text-sm font-medium">Hàn Quốc</span>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <img 
                  src="https://flagcdn.com/w40/us.png" 
                  alt="United States" 
                  className="w-8 h-6 object-cover rounded"
                />
                <span className="text-white text-sm font-medium">Hoa Kỳ</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Khám phá ngay
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full backdrop-blur-sm"
              >
                Tìm hiểu thêm
              </Button>
            </div>

            {/* Video Controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <span className="text-white/80 text-sm">
                {isMuted ? 'Âm thanh tắt' : 'Âm thanh bật'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default HeroVideoSection;
