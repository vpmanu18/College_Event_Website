import React from 'react';
import { Calendar, Award, Target, BookOpen, Compass, Shield } from 'lucide-react';

export const About = () => {
  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: 'var(--color-cyan)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>KLE INSTITUTIONAL PROFILE</h4>
          <h1 className="gradient-text-cyan-purple" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>
            ABOUT KLE SOCIETY'S DEGREE COLLEGE GANGAVATHI
          </h1>
        </div>

        {/* Detailed 10-line official content description block */}
        <div className="glass-panel" style={{ padding: '40px', marginBottom: '50px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--text-main)',
            fontWeight: '700',
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-color-dim)',
            paddingBottom: '12px'
          }}>
            Academic Foundation & Vision
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            lineHeight: '1.8',
            fontSize: '1.05rem',
            color: 'var(--text-muted)'
          }}>
            <p><strong>1. Establishing Institution:</strong> KLE Society's Degree College Gangavathi was established in the year 2023 under the prestigious KLE Society, Karnataka.</p>
            <p><strong>2. Educational Mandate:</strong> The college was founded with the fundamental goal of bringing premium, industry-standard undergraduate education to the region.</p>
            <p><strong>3. Holistic Development:</strong> The institute focuses on providing quality education while simultaneously developing students' interpersonal and intrapersonal abilities.</p>
            <p><strong>4. BCA Department Focus:</strong> The Department of Bachelor of Computer Applications (BCA) is focused on professional study, scientific research, and technological growth.</p>
            <p><strong>5. Intrapersonal Capabilities:</strong> We nurture self-discipline, goal alignment, cognitive capabilities, and analytical confidence among computer application scholars.</p>
            <p><strong>6. Technology Education:</strong> The academic program provides core coding expertise, database handling capability, and web application methodologies.</p>
            <p><strong>7. Professional Growth:</strong> Students undergo project-based learning and seminar exercises to prepare them for global corporate and engineering environments.</p>
            <p><strong>8. Research/Learning Environment:</strong> The department fosters a research-driven learning ecosystem to explore software optimizations and computational frameworks.</p>
            <p><strong>9. Career Orientation:</strong> Our comprehensive syllabus builds strong technical portfolios and analytical backgrounds suitable for modern placement options.</p>
            <p><strong>10. Innovation & Entrepreneurship:</strong> The college actively encourages technological creativity, coding hackathons, and entrepreneurial pathways to solve real-world problems.</p>
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <a
              href="https://klecollegegangavathi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cyan"
              style={{
                display: 'inline-flex',
                gap: '8px'
              }}
            >
              VISIT OFFICIAL COLLEGE WEBSITE
            </a>
          </div>
        </div>

        {/* Dynamic Cards detailing college attributes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div className="glass-panel" style={{ padding: '30px' }}>
            <Calendar size={24} style={{ color: 'var(--color-cyan)', marginBottom: '15px' }} />
            <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '10px' }}>Founded in 2023</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Established recently with high-tech laboratories and computational facilities supporting current curriculum requirements.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '30px' }}>
            <Target size={24} style={{ color: 'var(--color-purple)', marginBottom: '15px' }} />
            <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '10px' }}>Core Objectives</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Aiming to secure standard technical positions and research prospects for BCA graduates.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '30px' }}>
            <BookOpen size={24} style={{ color: '#38ef7d', marginBottom: '15px' }} />
            <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '10px' }}>BCA Program</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Includes standard courses in competitive coding, system algorithms, data structures, and web technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
