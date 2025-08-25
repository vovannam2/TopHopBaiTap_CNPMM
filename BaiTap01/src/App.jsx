import { useState } from "react";

export default function App() {
  return (
    <main style={{
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      fontFamily:"system-ui, Arial, sans-serif",
      background:"#f7fafc"
    }}>
      <div style={{
        width:"min(760px, 92%)",
        background:"#fff",
        padding:"32px",
        borderRadius:"16px",
        boxShadow:"0 10px 30px rgba(0,0,0,.08)"
      }}>
        <header style={{display:"flex", gap:"20px", alignItems:"center"}}>
          <img
            src="https://via.placeholder.com/96"
            alt="Avatar"
            style={{width:96, height:96, borderRadius:"50%", objectFit:"cover"}}
          />
          <div>
            <h1 style={{margin:"0 0 6px 0"}}>Võ Văn Nam</h1>
            <p style={{margin:0, color:"#555"}}>Sinh viên • MSSV: 22110379</p>
          </div>
        </header>

        <section style={{marginTop:24, lineHeight:1.7, color:"#333"}}>
          <h2>Giới thiệu</h2>
          <p>
            Mình yêu thích Web Frontend, đặc biệt là ReactJS. Mục tiêu ngắn hạn:
            hoàn thành các dự án nhỏ và triển khai lên Netlify/Vercel.
          </p>

          <h2>Thông tin liên hệ</h2>
          <ul>
            <li>Email: vovannam@gmail.com</li>
            <li>Điện thoại: 09xx xxx xxx</li>
            <li>Github: <a href="https://github.com/vovannam2" target="_blank">github.com/vannam</a></li>
          </ul>

          <h2>Kỹ năng</h2>
          <p>HTML, CSS, JavaScript, React, Git, TailwindCSS</p>
        </section>
      </div>
    </main>
  );
}
