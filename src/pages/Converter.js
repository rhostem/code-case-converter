import React, { Component } from 'react'
import styled from 'styled-components'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'
import Input from '../components/Input'
import RadioGroup from '../components/RadioGroup'
import * as R from 'ramda'
import { Page } from '../components/Layout'
import { isCamel, convertToCamel } from '../codecase/camel'
import { isConstant, convertToConstant } from '../codecase/constant'
import { isKebab, convertToKebab } from '../codecase/kebab'
import { isPascal, convertToPascal } from '../codecase/pascal'
import { isSnake, convertToSnake } from '../codecase/snake'
import { splitWordToConvert } from '../codecase/util'
import { replacer } from '../codecase/replacer'
import media from '../styles/media'
import keyProxy from '../utils/keyProxy'

const { ALL_CASE, AS_IS, CAMEL, PASCAL, CONSTANT, KEBAB, SNAKE } = keyProxy

const converterMap = {
  [CAMEL]: convertToCamel,
  [PASCAL]: convertToPascal,
  [CONSTANT]: convertToConstant,
  [KEBAB]: convertToKebab,
  [SNAKE]: convertToSnake,
}

const PageTitle = styled.h1`
  font-size: 2.2rem;
`

const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
`

const EditorWrap = styled.div`
  padding: 4px 0;
  border: 4px solid #e1e1e1;
`

const SearchAndPreview = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  ${media.mediumAndUp} {
    flex-direction: row;
  }

  & > * {
    &:not(:first-child) {
      margin-left: 0;
      ${media.mediumAndUp} {
        margin-left: 2rem;
      }
    }
  }
`

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2.5rem;

  & > * {
    flex: 1;
    &:not(:first-child) {
      margin-left: 2rem;
    }
  }
`

const CodeInput = styled(Input)`
  font-family: 'Fira Mono', monospace;
`

const InputAndOption = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;

  & > * {
    flex: 1;
  }
`

const SearchInputWrap = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
`

const ResultArea = styled.div`
  display: flex;
  margin-top: 20px;

  & > * {
    flex: 1;
    &:not(:first-child) {
      margin-left: 2rem;
    }
  }
`

const ReplacePreviewContainer = styled.div`
  min-height: 7rem;
`

const SearchReplacePreview = styled.div`
  display: flex;
  margin-bottom: 1rem;
  & > * {
    padding: 0.2rem 0.5rem;

    &:nth-child(1) {
      text-decoration: line-through;
    }
    &:nth-child(2) {
      width: 2rem;
      text-align: center;
    }
    &:nth-child(3) {
      background-color: rgb(31.4%, 56.1%, 87.1%, 0.3);
      border-radius: 0.4rem;
    }
  }
`

class Converter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: 'listUser',
      replace: 'updateItem',
      inputText: `const codeCases = \`
  listUser
  ListUser
  LIST_USER
  list-user
  list_user
\``,
      resultText: '',
      searchCaseOption: ALL_CASE,
      replaceCaseOption: AS_IS,
    }
  }

  searchTargetCases = [ALL_CASE, CAMEL, PASCAL, CONSTANT, KEBAB, SNAKE]
  replaceTargetCases = [AS_IS, CAMEL, PASCAL, CONSTANT, KEBAB, SNAKE]

  get replace() {
    return this.state.replace
  }

  /**
   * case converters selected by user
   */
  get targetConverters() {
    const { searchCaseOption } = this.state

    switch (searchCaseOption) {
      case ALL_CASE:
        return [
          convertToCamel,
          convertToPascal,
          convertToConstant,
          convertToKebab,
          convertToSnake,
        ]
      case CAMEL:
        return [convertToCamel]

      case PASCAL:
        return [convertToPascal]

      case CONSTANT:
        return [convertToConstant]

      case KEBAB:
        return [convertToKebab]

      case SNAKE:
        return [convertToSnake]

      default:
        return [R.identity]
    }
  }

  get isSearchNormalCase() {
    return R.allPass([
      R.compose(
        R.not,
        isCamel
      ),
      R.compose(
        R.not,
        isConstant
      ),
      R.compose(
        R.not,
        isKebab
      ),
      R.compose(
        R.not,
        isPascal
      ),
      R.compose(
        R.not,
        isSnake
      ),
    ])(this.state.search)
  }

  get searchWordsForConversion() {
    return splitWordToConvert(this.state.search)
  }

  get replaceWordsForConversion() {
    return splitWordToConvert(this.state.replace)
  }

  get caseConverterSelected() {
    switch (this.state.replaceCaseOption) {
      case CAMEL:
        return convertToCamel

      case PASCAL:
        return convertToPascal

      case CONSTANT:
        return convertToConstant

      case KEBAB:
        return convertToKebab

      case SNAKE:
        return convertToSnake

      default:
        return v => v
    }
  }

  componentDidMount() {
    this.convertInputText()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.inputText !== prevState.inputText ||
      this.state.search !== prevState.search ||
      this.state.replace !== prevState.replace ||
      this.state.searchCaseOption !== prevState.searchCaseOption ||
      this.state.replaceCaseOption !== prevState.replaceCaseOption
    ) {
      this.convertInputText()
    }
  }

  handleChangeSearch = e => {
    this.setState({ search: e.target.value })
  }

  handleChangeReplace = e => {
    this.setState({ replace: e.target.value })
  }

  handleChangeInputText = text => {
    this.setState({ inputText: text })
  }

  convertInputText = () => {
    if (!this.state.search) {
      return
    }
    const { replaceCaseOption } = this.state
    let resultText = this.state.inputText.slice()

    // not matching case type
    if (this.isSearchNormalCase) {
      resultText = replacer(resultText, this.state.search, this.state.replace)
    } else {
      resultText = this.targetConverters.reduce((resultInWork, converter) => {
        return replacer(
          resultInWork,
          converter(this.searchWordsForConversion),
          replaceCaseOption === AS_IS
            ? converter(this.replaceWordsForConversion)
            : this.caseConverterSelected(this.replaceWordsForConversion)
        )
      }, this.state.inputText)
    }

    this.setState({
      resultText,
    })
  }

  replaceWithSelectedConverters = () => {}

  render() {
    const { searchCaseOption, replaceCaseOption } = this.state

    return (
      <Page>
        <PageTitle>Code Case Converter</PageTitle>

        <hr />
        <SearchAndPreview>
          <SearchInputContainer>
            <InputAndOption>
              <SectionTitle>Search</SectionTitle>
              <SearchInputWrap>
                <CodeInput
                  placeholder="search"
                  value={this.state.search}
                  onChange={this.handleChangeSearch}
                />
              </SearchInputWrap>

              {this.searchTargetCases.map((targetCase, index) => {
                return (
                  <RadioGroup key={targetCase}>
                    <input
                      type="radio"
                      id={`search-${targetCase}`}
                      name="search_option"
                      value={targetCase}
                      disabled={this.isSearchNormalCase}
                      checked={this.state.searchCaseOption === targetCase}
                      onChange={() =>
                        this.setState({ searchCaseOption: targetCase })
                      }
                    />
                    <label htmlFor={`search-${targetCase}`}>{targetCase}</label>
                  </RadioGroup>
                )
              })}
            </InputAndOption>

            <InputAndOption>
              <SectionTitle>Replace</SectionTitle>
              <SearchInputWrap>
                <CodeInput
                  placeholder="replace"
                  value={this.state.replace}
                  onChange={this.handleChangeReplace}
                />
              </SearchInputWrap>

              {this.replaceTargetCases.map((targetCase, index) => {
                return (
                  <RadioGroup key={targetCase}>
                    <input
                      type="radio"
                      id={`replace-${targetCase}`}
                      name="replace_option"
                      value={targetCase}
                      disabled={this.isSearchNormalCase}
                      checked={this.state.replaceCaseOption === targetCase}
                      onChange={() =>
                        this.setState({ replaceCaseOption: targetCase })
                      }
                    />
                    <label htmlFor={`replace-${targetCase}`}>
                      {targetCase}
                    </label>
                  </RadioGroup>
                )
              })}
            </InputAndOption>
          </SearchInputContainer>

          <ReplacePreviewContainer>
            <SectionTitle>Preview</SectionTitle>
            {R.not(this.state.search) ? (
              <div>There is no input</div>
            ) : (
              <div>
                {this.isSearchNormalCase && (
                  <SearchReplacePreview>
                    <code>{this.state.search}</code>
                    <code>→</code>
                    <code>{this.replace}</code>
                  </SearchReplacePreview>
                )}

                {R.not(this.isSearchNormalCase) && (
                  <React.Fragment>
                    {this.replaceTargetCases.map(targetCase => {
                      const converter = converterMap[targetCase]
                      return (
                        converter &&
                        ((searchCaseOption === ALL_CASE ||
                          searchCaseOption === targetCase) && (
                          <SearchReplacePreview key={targetCase}>
                            <code>
                              {converterMap[targetCase](
                                this.searchWordsForConversion
                              )}
                            </code>
                            <code>→</code>
                            <code>
                              {replaceCaseOption === AS_IS
                                ? converterMap[targetCase](
                                    this.replaceWordsForConversion
                                  )
                                : this.caseConverterSelected(
                                    this.replaceWordsForConversion
                                  )}
                            </code>
                          </SearchReplacePreview>
                        ))
                      )
                    })}
                  </React.Fragment>
                )}
              </div>
            )}
          </ReplacePreviewContainer>
        </SearchAndPreview>

        <ResultArea>
          <EditorWrap>
            <AceEditor
              mode="javascript"
              theme="tomorrow"
              value={this.state.inputText}
              onChange={this.handleChangeInputText}
              name="inputText"
              editorProps={{ $blockScrolling: true }}
              showGutter={false}
              tabSize={2}
              fontSize={14}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </EditorWrap>
          <EditorWrap>
            <AceEditor
              readOnly={true}
              mode="javascript"
              theme="tomorrow"
              value={this.state.resultText}
              name="resultText"
              editorProps={{ $blockScrolling: true }}
              showGutter={false}
              tabSize={2}
              fontSize={14}
              highlightActiveLine={false}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </EditorWrap>
        </ResultArea>
      </Page>
    )
  }
}

export default Converter
