import Container from "../../components/Container";
import UseCaseForm from "../../components/useCaseComponents/UseCaseForm";
import UseCaseList from "../../components/useCaseComponents/UseCaseList";



export const UseCasesPage: React.FC = () => {


  return (
    <>
      <Container>
      <UseCaseForm />
      <UseCaseList />
      </Container>
    </>

  )
}

export default UseCasesPage;