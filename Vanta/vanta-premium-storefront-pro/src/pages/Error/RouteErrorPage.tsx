import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function RouteErrorPage() {
  const error = useRouteError()

  let title = 'Something went wrong'
  let message = 'The storefront hit an unexpected error. You can return home or reload the page.'

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText || 'Route Error'}`
    if (typeof error.data === 'string' && error.data.trim()) message = error.data
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <main className="route-error-page">
      <div className="route-error-card">
        <span className="eyebrow">VANTA / SYSTEM</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="route-error-actions">
          <Link className="btn btn-dark" to="/">Return home</Link>
          <button className="btn btn-light" onClick={() => window.location.reload()}>Reload page</button>
        </div>
      </div>
    </main>
  )
}
