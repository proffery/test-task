import s from './footer.module.css'
export const Footer = () => {
  return (
    <footer className={s.footer}>
      <a>Coded by&nbsp;</a>
      <a
        href={'https://proffery.github.io/portfolio/'}
        rel={'noreferrer'}
        target={'_blank'}
        title={'Portfolio'}
      >
        Dmitry Shamko&nbsp;
      </a>
      <a href={'https://github.com/proffery/test-task/'} rel={'noreferrer'} target={'_blank'}>
        <img alt={'github'} className={s.githubLogo} src={'./assets/github-mark.png'} />
      </a>
      <a>&nbsp;{new Date().getFullYear()}</a>
    </footer>
  )
}
