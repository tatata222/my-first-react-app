import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 画像のURLを保存するためのstate
  const [imageUrl, setImageUrl] = useState('');
  // データ取得中かどうかを示すためのstate
  const [loading, setLoading] = useState(true);

  // The Cat APIから画像を非同期で取得する関数
  const fetchCatImage = async () => {
    setLoading(true); // ロード開始
    try {
      // APIのURLを猫のものに変更
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      // 猫APIのデータ構造に合わせてURLを取得 (レスポンスは配列)
      if (data && data.length > 0) {
        setImageUrl(data[0].url);
      }
    } catch (error) {
      console.error('Error fetching cat image:', error);
    } finally {
      setLoading(false); // ロード完了
    }
  };

  // 最初にコンポーネントが表示された時に一度だけ画像を取得する
  useEffect(() => {
    fetchCatImage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Cat Image Viewer</h1>
        <p>Click the button to see a new cat!</p>
        
        <div style={{ margin: '20px' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <img src={imageUrl} alt="A Random Cat" style={{ maxWidth: '400px', maxHeight: '400px', borderRadius: '8px' }} />
          )}
        </div>

        <button onClick={fetchCatImage} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch New Cat!'}
        </button>
      </header>
    </div>
  );
}

export default App;