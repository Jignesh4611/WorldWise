import styles from './Sidebar.module.css'


function Footer() {
  return (
    <div>
       <footer className={styles.footer}>
            <p className={styles.coyright}>
              &copy; Copyright {new Date().getFullYear()}{" "}
               by world wise Inc.
            </p>
          </footer>
    </div>
  )
}

export default Footer
