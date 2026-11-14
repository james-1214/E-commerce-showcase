import React from 'react'
export default class ErrorBoundary extends React.Component {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? <div className="fallback"><span className="label">3D UNAVAILABLE</span><p>Your device could not start the 3D scene. Try a different browser or enable WebGL.</p></div> : this.props.children }
}
