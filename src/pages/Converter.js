import React, { Component } from 'react'
import styled from 'styled-components'
import TextArea from 'components/TextArea'
import Input from 'components/Input'
import RadioGroup from 'components/RadioGroup'
import * as R from 'ramda'
import { Page } from 'components/Layout'
import { isCamelCase, convertToCamel, splitCamelCase } from 'codecase/camel'
import {
  isConstantCase,
  convertToConstant,
  splitConstantCase,
} from 'codecase/constant'
import { isKebabCase, splitKebabCase, convertToKebab } from 'codecase/kebab'
import { isPascalCase, splitPascalCase, convertToPascal } from 'codecase/pascal'
import { isSnakeCase, splitSnakeCase, convertToSnake } from 'codecase/snake'
import keyProxy from 'utils/keyProxy'
import { replacer } from 'codecase/replacer'

const Preview = styled.pre`
  margin: 0;
  border: 1px solid #eee;
  text-align: left;
  white-space: pre-wrap;
`

const ResultArea = styled.div`
  display: flex;
  margin-top: 20px;

  & > * {
    flex: 1;
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
`

const { ALL_CASE, AS_IS, CAMEL, PASCAL, CONSTANT, KEBAB, SNAKE } = keyProxy

const InputAndOption = styled.div`
  display: flex;
`

class Converter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: 'ReadList',
      replace: 'UpdateUser',
      inputText: `
import { createActions } from 'redux-actions'
import { ReadListActionOption, ListCallData } from 'store/commonState/list'
import { makeAsyncType } from 'utils/redux'
import { mypageActions } from 'store/mypage/mypageActions'

export const types = {
  ...makeAsyncType('LIST_USER_DB'),
  ...makeAsyncType('BUY_USER_DB'),
  ...makeAsyncType('DASHBOARD'),
}

export const userDbActions = createActions({
  [types.REQ_LIST_USER_DB]: (option: ReadListActionOption) => option,
  [types.REQ_LIST_USER_DB_DONE]: (d: ListCallData) => d,
  [types.REQ_LIST_USER_DB_FAIL]: undefined,
})
`,
      resultText: '',
      searchCaseOption: ALL_CASE,
      replaceCaseOption: AS_IS,
    }
  }

  get replace() {
    return this.state.replace || this.state.search
  }

  get isSearchNormalCase() {
    return R.allPass([
      R.compose(
        R.not,
        isCamelCase
      ),
      R.compose(
        R.not,
        isConstantCase
      ),
      R.compose(
        R.not,
        isKebabCase
      ),
      R.compose(
        R.not,
        isPascalCase
      ),
      R.compose(
        R.not,
        isSnakeCase
      ),
    ])(this.state.search)
  }

  get searchWords() {
    const { search } = this.state
    if (isCamelCase(search)) {
      return splitCamelCase(search)
    } else if (isConstantCase(search)) {
      return splitConstantCase(search)
    } else if (isKebabCase(search)) {
      return splitKebabCase(search)
    } else if (isPascalCase(search)) {
      return splitPascalCase(search)
    } else if (isSnakeCase(search)) {
      return splitSnakeCase(search)
    } else {
      return [search]
    }
  }

  get replaceWords() {
    const { replace } = this
    if (isCamelCase(replace)) {
      return splitCamelCase(replace)
    } else if (isConstantCase(replace)) {
      return splitConstantCase(replace)
    } else if (isKebabCase(replace)) {
      return splitKebabCase(replace)
    } else if (isPascalCase(replace)) {
      return splitPascalCase(replace)
    } else if (isSnakeCase(replace)) {
      return splitSnakeCase(replace)
    } else {
      return [replace]
    }
  }

  get replaceCaseConverter() {
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

  handleChangeInputText = e => {
    this.setState({ inputText: e.target.value })
    this.setState({ resultText: e.target.value })
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
      // convert all case of search
      if (this.state.searchCaseOption === ALL_CASE) {
        resultText = replacer(
          resultText,
          convertToCamel(this.searchWords),
          replaceCaseOption === AS_IS
            ? convertToCamel(this.replaceWords)
            : this.replaceCaseConverter(this.replaceWords)
        )
        resultText = replacer(
          resultText,
          convertToConstant(this.searchWords),
          replaceCaseOption === AS_IS
            ? convertToConstant(this.replaceWords)
            : this.replaceCaseConverter(this.replaceWords)
        )
        resultText = replacer(
          resultText,
          convertToPascal(this.searchWords),
          replaceCaseOption === AS_IS
            ? convertToPascal(this.replaceWords)
            : this.replaceCaseConverter(this.replaceWords)
        )
        resultText = replacer(
          resultText,
          convertToKebab(this.searchWords),
          replaceCaseOption === AS_IS
            ? convertToKebab(this.replaceWords)
            : this.replaceCaseConverter(this.replaceWords)
        )
        resultText = replacer(
          resultText,
          convertToSnake(this.searchWords),
          replaceCaseOption === AS_IS
            ? convertToSnake(this.replaceWords)
            : this.replaceCaseConverter(this.replaceWords)
        )
      } else {
        // convert specific case of searching
        switch (this.state.searchCaseOption) {
          case CAMEL:
            resultText = replacer(
              resultText,
              convertToCamel(this.searchWords),
              replaceCaseOption === AS_IS
                ? convertToCamel(this.replaceWords)
                : this.replaceCaseConverter(this.replaceWords)
            )
            break

          case PASCAL:
            resultText = replacer(
              resultText,
              convertToPascal(this.searchWords),
              replaceCaseOption === AS_IS
                ? convertToPascal(this.replaceWords)
                : this.replaceCaseConverter(this.replaceWords)
            )
            break

          case CONSTANT:
            resultText = replacer(
              resultText,
              convertToConstant(this.searchWords),
              convertToConstant(this.replaceWords)
            )
            break

          case KEBAB:
            resultText = replacer(
              resultText,
              convertToKebab(this.searchWords),
              convertToKebab(this.replaceWords)
            )
            break

          case SNAKE:
            resultText = replacer(
              resultText,
              convertToSnake(this.searchWords),
              convertToSnake(this.replaceWords)
            )
            break

          default:
            break
        }

        resultText = replacer(
          resultText,
          convertToCamel(this.searchWords),
          convertToCamel(this.replaceWords)
        )
      }
    }

    this.setState({
      resultText,
    })
  }

  render() {
    const { searchCaseOption, replaceCaseOption } = this.state

    return (
      <Page>
        <h1>code case converter</h1>
        <InputAndOption>
          <div>
            <Input
              placeholder="search"
              value={this.state.search}
              onChange={this.handleChangeSearch}
            />
          </div>
          <RadioGroup>
            <input
              type="radio"
              id="search_all_case"
              name="search_option"
              value={ALL_CASE}
              disabled={this.isSearchNormalCase}
              checked={searchCaseOption === ALL_CASE}
              onChange={() => this.setState({ searchCaseOption: ALL_CASE })}
            />
            <label htmlFor="search_all_case">all_case</label>
            <input
              type="radio"
              id="search_camel"
              name="search_option"
              value={CAMEL}
              disabled={this.isSearchNormalCase}
              checked={searchCaseOption === CAMEL}
              onChange={() => this.setState({ searchCaseOption: CAMEL })}
            />
            <label htmlFor="search_camel">camel</label>
            <input
              type="radio"
              id="search_pascal"
              name="search_option"
              value={PASCAL}
              disabled={this.isSearchNormalCase}
              checked={searchCaseOption === PASCAL}
              onChange={() => this.setState({ searchCaseOption: PASCAL })}
            />
            <label htmlFor="search_pascal">pascal</label>
            <input
              type="radio"
              id="search_constant"
              name="search_option"
              value={CONSTANT}
              disabled={this.isSearchNormalCase}
              checked={searchCaseOption === CONSTANT}
              onChange={() => this.setState({ searchCaseOption: CONSTANT })}
            />
            <label htmlFor="search_constant">constant</label>
            <input
              type="radio"
              id="search_kebab"
              name="search_option"
              value={KEBAB}
              disabled={this.isSearchNormalCase}
              checked={searchCaseOption === KEBAB}
              onChange={() => this.setState({ searchCaseOption: KEBAB })}
            />
            <label htmlFor="search_kebab">kebab</label>
            <input
              type="radio"
              id="search_snake"
              name="search_option"
              value={SNAKE}
              disabled={this.isSearchNormalCase}
              checked={searchCaseOption === SNAKE}
              onChange={() => this.setState({ searchCaseOption: SNAKE })}
            />
            <label htmlFor="search_snake">snake</label>
          </RadioGroup>
        </InputAndOption>

        <hr />
        <div>to</div>
        <hr />
        <InputAndOption>
          <div>
            <Input
              placeholder="replace"
              value={this.state.replace}
              onChange={this.handleChangeReplace}
            />
          </div>
          <RadioGroup>
            <input
              type="radio"
              id="replace_as_is"
              name="replace_option"
              value={AS_IS}
              checked={replaceCaseOption === AS_IS}
              onChange={() => this.setState({ replaceCaseOption: AS_IS })}
            />
            <label htmlFor="replace_as_is">as is</label>
            <input
              type="radio"
              id="replace_camel"
              name="replace_option"
              value={CAMEL}
              disabled={this.isSearchNormalCase}
              checked={replaceCaseOption === CAMEL}
              onChange={() => this.setState({ replaceCaseOption: CAMEL })}
            />
            <label htmlFor="replace_camel">camel</label>
            <input
              type="radio"
              id="replace_pascal"
              name="replace_option"
              value={PASCAL}
              disabled={this.isSearchNormalCase}
              checked={replaceCaseOption === PASCAL}
              onChange={() => this.setState({ replaceCaseOption: PASCAL })}
            />
            <label htmlFor="replace_pascal">pascal</label>
            <input
              type="radio"
              id="replace_constant"
              name="replace_option"
              value={CONSTANT}
              disabled={this.isSearchNormalCase}
              checked={replaceCaseOption === CONSTANT}
              onChange={() => this.setState({ replaceCaseOption: CONSTANT })}
            />
            <label htmlFor="replace_constant">constant</label>
            <input
              type="radio"
              id="replace_kebab"
              name="replace_option"
              value={KEBAB}
              disabled={this.isSearchNormalCase}
              checked={replaceCaseOption === KEBAB}
              onChange={() => this.setState({ replaceCaseOption: KEBAB })}
            />
            <label htmlFor="replace_kebab">kebab</label>
            <input
              type="radio"
              id="replace_snake"
              name="replace_option"
              value={SNAKE}
              disabled={this.isSearchNormalCase}
              checked={replaceCaseOption === SNAKE}
              onChange={() => this.setState({ replaceCaseOption: SNAKE })}
            />
            <label htmlFor="replace_snake">snake</label>
          </RadioGroup>
        </InputAndOption>

        <div>
          <h2>preview search and replace</h2>

          {this.isSearchNormalCase && (
            <div>
              {this.state.search} => {this.replace}
            </div>
          )}

          {R.not(this.isSearchNormalCase) && (
            <React.Fragment>
              {(searchCaseOption === ALL_CASE ||
                searchCaseOption === CAMEL) && (
                <div>
                  {convertToCamel(this.searchWords)} =>{' '}
                  {replaceCaseOption === AS_IS
                    ? convertToCamel(this.replaceWords)
                    : this.replaceCaseConverter(this.replaceWords)}
                </div>
              )}
              {(searchCaseOption === ALL_CASE ||
                searchCaseOption === PASCAL) && (
                <div>
                  {convertToPascal(this.searchWords)} =>{' '}
                  {replaceCaseOption === AS_IS
                    ? convertToPascal(this.replaceWords)
                    : this.replaceCaseConverter(this.replaceWords)}
                </div>
              )}
              {(searchCaseOption === ALL_CASE ||
                searchCaseOption === CONSTANT) && (
                <div>
                  {convertToConstant(this.searchWords)} =>{' '}
                  {replaceCaseOption === AS_IS
                    ? convertToConstant(this.replaceWords)
                    : this.replaceCaseConverter(this.replaceWords)}
                </div>
              )}
              {(searchCaseOption === ALL_CASE ||
                searchCaseOption === KEBAB) && (
                <div>
                  {convertToKebab(this.searchWords)} =>{' '}
                  {replaceCaseOption === AS_IS
                    ? convertToKebab(this.replaceWords)
                    : this.replaceCaseConverter(this.replaceWords)}
                </div>
              )}
              {(searchCaseOption === ALL_CASE ||
                searchCaseOption === SNAKE) && (
                <div>
                  {convertToSnake(this.searchWords)} =>{' '}
                  {replaceCaseOption === AS_IS
                    ? convertToSnake(this.replaceWords)
                    : this.replaceCaseConverter(this.replaceWords)}
                </div>
              )}
            </React.Fragment>
          )}
        </div>

        <ResultArea>
          <TextArea
            id="inputText"
            value={this.state.inputText}
            onChange={this.handleChangeInputText}
            style={{ fontFamily: 'monospace' }}
          />

          <Preview>{this.state.resultText}</Preview>
        </ResultArea>
      </Page>
    )
  }
}

export default Converter
