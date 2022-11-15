export interface UseCaseAsync<InputUseCase, OutputUseCase> {
    execute(input: InputUseCase): Promise<OutputUseCase>;
}