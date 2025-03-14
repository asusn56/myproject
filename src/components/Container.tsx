interface ContainerProps {
    children: React.ReactNode;
  }

const Container:React.FC<ContainerProps> = (props:ContainerProps) =>{
    const { children } = props

    return (
        <div className="container">
            {children}
        </div>
    )
}

export default Container;