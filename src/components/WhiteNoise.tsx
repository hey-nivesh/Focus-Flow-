import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface SoundOption {
  id: string;
  name: string;
  url: string;
  icon: string;
}

const soundOptions: SoundOption[] = [
  {
    id: 'rain',
    name: 'Rain',
    url: './white sounds/light-rain-109591.mp3',
    icon: '🌧️'
  },
  {
    id: 'waves',
    name: 'Ocean Waves',
    url: './white sounds/ocean-waves-250310.mp3',
    icon: '🌊'
  },
  {
    id: 'forest',
    name: 'Forest',
    url: './white sounds/forest-163012.mp3',
    icon: '🌳'
  },
  {
    id: 'whitenoise',
    name: 'White Noise',
    url: './white sounds/waves-white-noise-9777.mp3',
    icon: '🌫️'
  }
];

const WhiteNoise: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const playSound = (soundId: string) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (activeSound === soundId) {
      setActiveSound(null);
      setAudio(null);
      return;
    }

    const sound = soundOptions.find(s => s.id === soundId);
    if (sound) {
      const newAudio = new Audio(sound.url);
      newAudio.loop = true;
      newAudio.volume = volume;
      newAudio.play();
      setAudio(newAudio);
      setActiveSound(soundId);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Focus Sounds</h1>
        
        {/* Volume Control */}
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {volume === 0 ? (
              <VolumeX className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Volume2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Sound Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {soundOptions.map((sound) => (
            <button
              key={sound.id}
              onClick={() => playSound(sound.id)}
              className={`p-6 rounded-lg shadow-md transition-all duration-300 ${
                activeSound === sound.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <span className="text-4xl">{sound.icon}</span>
                <span className="font-medium">{sound.name}</span>
                {activeSound === sound.id ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Focus Tips</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Use ambient sounds to mask distracting background noise</li>
            <li>• Keep the volume at a comfortable, non-intrusive level</li>
            <li>• Experiment with different sounds to find what works best for you</li>
            <li>• Take regular breaks to prevent listening fatigue</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhiteNoise;